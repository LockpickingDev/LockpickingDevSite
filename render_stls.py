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
    scene.render.engine = 'BLENDER_EEVEE'

    world = scene.world
    world.node_tree.nodes['Background'].inputs[0].default_value = (0, 0, 0, 1)  # black
    world.node_tree.nodes['Background'].inputs[1].default_value = 0.6  # ambient fill

    scene.render.resolution_x = RENDER_W
    scene.render.resolution_y = RENDER_H
    scene.render.image_settings.file_format = 'PNG'

def add_lights(dist):
    lights = []

    # SUN lights are directional — no distance falloff, reliable across all model sizes
    # Key light: front right above
    bpy.ops.object.light_add(type='SUN', location=(dist * 1.5, -dist * 1.2, dist * 2.0))
    key = bpy.context.active_object
    key.rotation_euler = (Vector((0,0,0)) - key.location).to_track_quat('-Z','Y').to_euler()
    key.data.energy = 3.0
    lights.append(key)

    # Fill light: left side, slight cyan tint
    bpy.ops.object.light_add(type='SUN', location=(-dist * 1.5, -dist * 0.8, dist * 1.2))
    fill = bpy.context.active_object
    fill.rotation_euler = (Vector((0,0,0)) - fill.location).to_track_quat('-Z','Y').to_euler()
    fill.data.energy = 1.5
    fill.data.color = (0.6, 0.95, 1.0)
    lights.append(fill)

    # Rim light: back
    bpy.ops.object.light_add(type='SUN', location=(0, dist * 2.0, dist * 0.8))
    rim = bpy.context.active_object
    rim.rotation_euler = (Vector((0,0,0)) - rim.location).to_track_quat('-Z','Y').to_euler()
    rim.data.energy = 1.0
    lights.append(rim)

    return lights

def make_material():
    mat = bpy.data.materials.new("Print")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes['Principled BSDF']
    bsdf.inputs['Base Color'].default_value = (1.0, 1.0, 1.0, 1)  # white
    bsdf.inputs['Metallic'].default_value = 0.0
    bsdf.inputs['Roughness'].default_value = 0.5
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

    # Scale lights and camera to this model's size
    bbox = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    size = max((max(v[i] for v in bbox) - min(v[i] for v in bbox)) for i in range(3))
    dist = size * 1.6

    lights = add_lights(dist)

    # Place camera and aim at origin — top-left angle
    cam_loc = Vector((-dist * 1.0, -dist * 0.8, dist * 1.1))
    bpy.ops.object.camera_add(location=cam_loc)
    cam = bpy.context.active_object
    direction = Vector((0, 0, 0)) - cam_loc
    cam.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
    bpy.context.scene.camera = cam

    scene = bpy.context.scene
    scene.render.filepath = str(out_path)
    bpy.ops.render.render(write_still=True)

    # Clean up this model's objects before next render
    for light in lights:
        bpy.data.objects.remove(light)
    bpy.data.objects.remove(obj)
    bpy.data.objects.remove(cam)

# ── Entry point ───────────────────────────────────────────────────────────────
reset_scene()
setup_scene()

stl_files = [f for f in STL_ROOT.rglob("*.stl") if "TempPics" not in str(f)]
print(f"\nFound {len(stl_files)} STL files\n")

for stl in stl_files:
    out = stl.with_suffix('.png')
    print(f"  render  {stl.name} ... ", end='', flush=True)
    try:
        render_stl(stl, out)
        print("done")
    except Exception as e:
        print(f"ERROR: {e}")
