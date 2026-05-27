import bpy
from pathlib import Path
from mathutils import Vector

STL_ROOT = Path(r"C:\Users\dan7g\source\repos\LockpickingDevSite\public\3dprinting")
RENDER_W, RENDER_H = 800, 600  # 4:3 matches card aspect-ratio

def reset_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=True)
    for mat in bpy.data.materials:
        bpy.data.materials.remove(mat)

def setup_scene():
    scene = bpy.context.scene
    scene.render.engine = 'BLENDER_EEVEE'  # fast; swap to CYCLES for ray-traced quality

    # Background color matching site's --terminal (#0a1628)
    world = scene.world
    world.node_tree.nodes['Background'].inputs[0].default_value = (0.039, 0.086, 0.157, 1)
    world.node_tree.nodes['Background'].inputs[1].default_value = 0

    # Key light
    bpy.ops.object.light_add(type='AREA', location=(4, -3, 6))
    bpy.context.active_object.data.energy = 300

    # Fill light — cyan tint to match site aesthetic
    bpy.ops.object.light_add(type='AREA', location=(-4, -2, 3))
    fill = bpy.context.active_object.data
    fill.energy = 150
    fill.color = (0.2, 0.9, 1.0)

    # Rim light
    bpy.ops.object.light_add(type='AREA', location=(0, 6, 2))
    bpy.context.active_object.data.energy = 80

def make_material():
    mat = bpy.data.materials.new("Print")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes['Principled BSDF']
    bsdf.inputs['Base Color'].default_value = (0.72, 0.82, 0.88, 1)  # light steel blue
    bsdf.inputs['Metallic'].default_value = 0.15
    bsdf.inputs['Roughness'].default_value = 0.4
    return mat

def render_stl(stl_path: Path, out_path: Path):
    bpy.ops.wm.stl_import(filepath=str(stl_path))
    objects = bpy.context.selected_objects
    if not objects:
        return

    obj = objects[0]
    obj.data.materials.clear()
    obj.data.materials.append(make_material())

    # Center the object at the origin
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
    obj.location = (0, 0, 0)

    # Size the camera distance to the object's bounding box
    bbox = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    size = max((max(v[i] for v in bbox) - min(v[i] for v in bbox)) for i in range(3))
    dist = size * 2.2

    # Place camera and aim it at the origin
    cam_loc = Vector((dist * 0.8, -dist * 1.1, dist * 0.7))
    bpy.ops.object.camera_add(location=cam_loc)
    cam = bpy.context.active_object
    direction = Vector((0, 0, 0)) - cam_loc
    cam.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
    bpy.context.scene.camera = cam

    scene = bpy.context.scene
    scene.render.resolution_x = RENDER_W
    scene.render.resolution_y = RENDER_H
    scene.render.filepath = str(out_path)
    scene.render.image_settings.file_format = 'PNG'
    bpy.ops.render.render(write_still=True)

    bpy.data.objects.remove(obj)
    bpy.data.objects.remove(cam)

# ── Entry point ───────────────────────────────────────────────────────────────
reset_scene()
setup_scene()

stl_files = [f for f in STL_ROOT.rglob("*.stl") if "TempPics" not in str(f)]
print(f"\nFound {len(stl_files)} STL files\n")

for stl in stl_files:
    out = stl.with_suffix('.png')
    if out.exists():
        print(f"  skip    {stl.name}")
        continue
    print(f"  render  {stl.name} ... ", end='', flush=True)
    try:
        render_stl(stl, out)
        print("done")
    except Exception as e:
        print(f"ERROR: {e}")
