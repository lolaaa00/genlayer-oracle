# { "Depends": "py-genlayer:test" }
from genlayer import *
import json

class OracleAgent(gl.Contract):
    total_classifications: u64

    def __init__(self):
        self.total_classifications = 0

    @gl.public.view
    def get_stats(self) -> dict:
        return {
            "total_classifications": int(self.total_classifications)
        }

    @gl.public.write
    def classify_agent(self, handle: str, display_name: str, roles: str) -> str:
        def nondet() -> str:
            prompt = (
                "You are the GenLayer Oracle on the blockchain.\n"
                "Classify this GenLayer community member:\n"
                f"Handle: {handle}\n"
                f"Name: {display_name}\n"
                f"Roles: {roles}\n\n"
                "Generate a funny meme-worthy profile using GenLayer concepts.\n"
                "Return ONLY valid JSON no markdown:\n"
                '{"role":"2-4 word title","power":"1 sentence ability","quirk":"1 funny flaw","lore":"2 sentence history"}'
            )
            result = gl.exec_prompt(prompt)
            result = result.replace("```json", "").replace("```", "").strip()
            parsed = json.loads(result)
            return json.dumps(parsed, sort_keys=True)

        raw = gl.eq_principle_strict_eq(nondet)
        parsed = json.loads(raw)
        self.total_classifications += 1
        return json.dumps(parsed)
