"""Agent management and command execution."""

from flask import Blueprint, request, jsonify

bp = Blueprint("agents", __name__, url_prefix="/api/agents")

# In-memory registry of agents
agents = {}


def register_agent(agent_id: str):
    agents[agent_id] = {"status": "online"}


def get_active_count() -> int:
    return len(agents)


@bp.get("/")
def list_agents():
    return jsonify(agents)


@bp.post("/command")
def send_command():
    # Placeholder: this would send command to agent
    data = request.json or {}
    command = data.get("command")
    target = data.get("agent")
    return jsonify({"agent": target, "command": command, "status": "sent"})
