"""Authentication logic for admin login."""

from flask import Blueprint, request, jsonify, session
from .utils import load_config, save_config, hash_password, verify_password

bp = Blueprint("auth", __name__, url_prefix="/api")

CONFIG = load_config()
ADMIN_HASH = CONFIG.get("admin_hash")

if not ADMIN_HASH:
    # Default admin password is "admin" if none set; hash and store
    ADMIN_HASH = hash_password("admin")
    CONFIG["admin_hash"] = ADMIN_HASH
    save_config(CONFIG)


@bp.post("/login")
def login():
    data = request.json or {}
    password = data.get("password", "")
    if verify_password(password, ADMIN_HASH):
        session["admin"] = True
        return jsonify({"ok": True})
    return jsonify({"ok": False}), 401


@bp.post("/logout")
def logout():
    session.pop("admin", None)
    return jsonify({"ok": True})
