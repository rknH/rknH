"""Background task for streaming system metrics via SocketIO."""

import time
from threading import Thread
from flask_socketio import SocketIO
from .utils import get_system_metrics


def start_monitoring(socketio: SocketIO):
    def run():
        while True:
            metrics = get_system_metrics()
            socketio.emit("metrics", metrics)
            time.sleep(1)

    thread = Thread(target=run, daemon=True)
    thread.start()
