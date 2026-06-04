import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | LockpickingDev</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="notfound-page">
        <div className="notfound-content">
          <div className="notfound-code">404</div>
          <div className="notfound-terminal">
            <span className="notfound-prompt">$ </span>
            <span className="notfound-cmd">find / --path <span className="notfound-arg">"{window.location.pathname}"</span></span>
            <br />
            <span className="notfound-error">ERROR: path not found - lock is not here</span>
          </div>
          <p className="notfound-msg">
            That page doesn't exist. Maybe it was moved, or maybe you're trying to pick a lock that isn't installed.
          </p>
          <Link to="/" className="btn-terminal btn-primary-t notfound-btn">← Back to Home</Link>
        </div>
      </div>
    </>
  )
}
