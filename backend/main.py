"""Entry point for the Flask application with SocketIO."""

from flask import Flask, send_from_directory, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from .auth import bp as auth_bp
from .agents import bp as agents_bp, get_active_count
from .monitoring import start_monitoring
from .utils import get_system_metrics

app = Flask(__name__, static_folder="../public", static_url_path="/")
app.config["SECRET_KEY"] = "change-me"
CORS(app, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

app.register_blueprint(auth_bp)
app.register_blueprint(agents_bp)


@app.get("/api/status")
def status():
    return jsonify({**get_system_metrics(), "agents": get_active_count()})


@app.get("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@socketio.on("connect")
def on_connect():
    socketio.emit("metrics", {**get_system_metrics(), "agents": get_active_count()})


if __name__ == "__main__":
    start_monitoring(socketio)
    socketio.run(app, host="0.0.0.0", port=5000)
