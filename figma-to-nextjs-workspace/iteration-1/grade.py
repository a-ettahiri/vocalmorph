"""Grade iteration-1 runs programmatically (substring assertions) and write
grading.json + timing.json into <config>/run-1/ per the skill-creator schema.
Run: python figma-to-nextjs-workspace/iteration-1/grade.py (from repo root).
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent

# eval dir -> config -> list of (assertion text, target file, required substrings)
CHECKS = {
    "eval-1-login-screen": {
        "with_skill": [
            ("page.tsx exports Next.js metadata with title and description",
             "page.tsx", ["export const metadata", "title", "description"]),
            ("login-form.tsx is a 'use client' component with console.log stub handlers",
             "login-form.tsx", ["'use client'", "console.log"]),
            ("Decorative panel is fixed 50vw and hidden below 1420px",
             "page.tsx", ["w-[50vw]", "min-[1420px]:flex"]),
            ("Form documents the Frame 83 'See other options' exclusion in code",
             "login-form.tsx", ["See other options"]),
            ("Transcript names the pixel-diff-login.mjs gate script",
             "transcript.md", ["pixel-diff-login"]),
        ],
        "without_skill": [
            ("page.tsx exports Next.js metadata with title and description",
             "page.tsx", ["export const metadata", "title", "description"]),
            ("login-form.tsx is a 'use client' component with console.log stub handlers",
             "login-form.tsx", ["'use client'", "console.log"]),
            ("Decorative panel is fixed 50vw and hidden below 1420px",
             "page.tsx", ["w-[50vw]", "min-[1420px]:flex"]),
            ("Form documents the Frame 83 'See other options' exclusion in code",
             "login-form.tsx", ["See other options"]),
            ("Transcript names the pixel-diff-login.mjs gate script",
             "transcript.md", ["pixel-diff-login"]),
        ],
    },
    "eval-2-sidebar-route": {
        "with_skill": [
            ("Route page keeps 48px sides with a sticky full-height sidebar wrapper",
             "page.tsx", ["px-[3rem]", "sticky top-0"]),
            ("Sidebar reuses verbatim /figma/sidebar asset refs",
             "app-sidebar.tsx", ["/figma/sidebar"]),
            ("Transcript cites the sidebar-region gate script and its x=48 crop",
             "transcript.md", ["pixel-diff-cookies", "48"]),
            ("Transcript maps the work to SKILL.md sections",
             "transcript.md", ["SKILL.md"]),
        ],
        "without_skill": [
            ("Route page keeps 48px sides with a sticky full-height sidebar wrapper",
             "page.tsx", ["px-[3rem]", "sticky top-0"]),
            ("Sidebar reuses verbatim /figma/sidebar asset refs",
             "app-sidebar.tsx", ["/figma/sidebar"]),
            ("Transcript cites the sidebar-region gate script and its x=48 crop",
             "transcript.md", ["pixel-diff-cookies", "48"]),
            ("Transcript maps the work to SKILL.md sections",
             "transcript.md", ["SKILL.md"]),
        ],
    },
    "eval-3-footer-fix": {
        "with_skill": [
            ("Footer snippet applies symmetric 10.8px (0.675rem) left and right insets",
             "member-footer.tsx", ["pl-[0.675rem]", "pr-[0.675rem]"]),
            ("Transcript derives the exact tenth-pixel footer band 756.4 to 821.2",
             "transcript.md", ["756.4", "821.2"]),
            ("Transcript states PASS as percent < 0.01 with the pixelmatch threshold",
             "transcript.md", ["percent < 0.01", "threshold"]),
            ("Transcript lists pre-gate verification (tsc, lint, build) before claiming PASS",
             "transcript.md", ["tsc", "lint", "build"]),
        ],
        "without_skill": [
            ("Footer snippet applies symmetric 10.8px (0.675rem) left and right insets",
             "member-footer.tsx", ["pl-[0.675rem]", "pr-[0.675rem]"]),
            ("Transcript derives the exact tenth-pixel footer band 756.4 to 821.2",
             "transcript.md", ["756.4", "821.2"]),
            ("Transcript states PASS as percent < 0.01 with the pixelmatch threshold",
             "transcript.md", ["percent < 0.01", "threshold"]),
            ("Transcript lists pre-gate verification (tsc, lint, build) before claiming PASS",
             "transcript.md", ["tsc", "lint", "build"]),
        ],
    },
}


def find_line(text, needle):
    for line in text.splitlines():
        if needle in line:
            return line.strip()[:180]
    return ""


def main():
    for eval_name, configs in CHECKS.items():
        for config, checks in configs.items():
            out_dir = ROOT / eval_name / config / "outputs"
            run_dir = ROOT / eval_name / config / "run-1"
            run_dir.mkdir(parents=True, exist_ok=True)
            expectations = []
            output_chars = 0
            transcript_chars = 0
            for text, fname, needles in checks:
                fpath = out_dir / fname
                content = fpath.read_text(encoding="utf-8", errors="replace") if fpath.exists() else ""
                missing = [n for n in needles if n not in content]
                passed = not missing
                if passed:
                    evidence = "Found in %s: '%s'" % (fname, find_line(content, needles[0]))
                else:
                    evidence = "%s missing from %s: %s" % (fname, fname, ", ".join("'%s'" % m for m in missing))
                expectations.append({"text": text, "passed": passed, "evidence": evidence})
            for f in sorted(out_dir.iterdir()):
                if f.is_file():
                    n = len(f.read_text(encoding="utf-8", errors="replace"))
                    output_chars += n
                    if f.name == "transcript.md":
                        transcript_chars = n
            passed_n = sum(1 for e in expectations if e["passed"])
            total = len(expectations)
            grading = {
                "expectations": expectations,
                "summary": {
                    "passed": passed_n,
                    "failed": total - passed_n,
                    "total": total,
                    "pass_rate": round(passed_n / total, 4) if total else 0.0,
                },
                "execution_metrics": {
                    "tool_calls": {},
                    "total_tool_calls": 0,
                    "total_steps": 0,
                    "errors_encountered": 0,
                    "output_chars": output_chars,
                    "transcript_chars": transcript_chars,
                },
                "timing": {},
                "claims": [],
                "user_notes_summary": {
                    "uncertainties": ["Executor tool-call counts unavailable in this harness; only output/transcript sizes measured."],
                    "needs_review": [],
                    "workarounds": [],
                },
            }
            (run_dir / "grading.json").write_text(json.dumps(grading, indent=2), encoding="utf-8")
            timing = {
                "total_tokens": 0,
                "duration_ms": 0,
                "total_duration_seconds": 0.0,
                "note": "OpenCode task channel exposes no token/timing telemetry, so time/token comparisons are unavailable for iteration-1; pass_rate is the comparison metric.",
            }
            (run_dir / "timing.json").write_text(json.dumps(timing, indent=2), encoding="utf-8")
            print("%s/%s: %d/%d passed (%.2f)" % (eval_name, config, passed_n, total, passed_n / total if total else 0))


if __name__ == "__main__":
    main()
