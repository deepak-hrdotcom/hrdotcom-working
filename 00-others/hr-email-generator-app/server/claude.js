// Runs Claude Code headless (`claude -p`) with the user's own Claude login.
// No API key: this only works on the machine where Claude Code is signed in.

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const MODELS = {
  // Copy and branding: the user chose quality over speed
  writer: { model: 'claude-opus-5-5', effort: 'medium' },
  // Mechanical Drive work (find, upload, download)
  drive: { model: 'claude-sonnet-5-5', effort: 'low' },
};

export const DRIVE_TOOLS = [
  'mcp__claude_ai_Google_Drive__search_files',
  'mcp__claude_ai_Google_Drive__create_file',
  'mcp__claude_ai_Google_Drive__download_file_content',
  'mcp__claude_ai_Google_Drive__get_file_metadata',
  'Read',
];

// Claude Code always runs from this one folder (outside the repo, so no project files or
// settings leak in, and its session history collects in one place). Each job gets a subfolder.
export const JOBS_ROOT = path.join(os.tmpdir(), 'hr-email-jobs');

export function newJob(label) {
  const name = `${new Date().toISOString().replace(/[:.]/g, '-')}-${label}`;
  const dir = path.join(JOBS_ROOT, name);
  fs.mkdirSync(dir, { recursive: true });
  return { name, dir };
}

// Where Claude Code keeps files that tools (like the Drive download) save for runs from JOBS_ROOT
const TOOL_RESULTS_ROOT = path.join(os.homedir(), '.claude', 'projects', JOBS_ROOT.replace(/[^a-zA-Z0-9]/g, '-'));

// Files downloaded by a Drive tool since `sinceMs`, newest first. Claude retypes paths and
// can get a character wrong, so the server finds the files itself instead of trusting it.
export function downloadedSince(sinceMs) {
  const found = [];
  const list = (dir, opts) => { try { return fs.readdirSync(dir, opts); } catch { return []; } };
  for (const s of list(TOOL_RESULTS_ROOT, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    const dir = path.join(TOOL_RESULTS_ROOT, s.name, 'tool-results');
    for (const f of list(dir)) {
      if (!f.includes('Google_Drive')) continue;
      const full = path.join(dir, f);
      const mtime = fs.statSync(full).mtimeMs;
      if (mtime >= sinceMs) found.push({ path: full, mtime });
    }
  }
  return found.sort((a, b) => b.mtime - a.mtime).map((f) => f.path);
}

// The reported path if it exists, else the downloaded file whose name carries the same blob id
export function resolveDownload(reported, sinceMs) {
  if (reported && fs.existsSync(reported)) return reported;
  const id = String(reported || '').match(/blob-([\w-]+)\.\w+$/);
  const recent = downloadedSince(sinceMs);
  return (id && recent.find((p) => p.includes(id[1]))) || null;
}

// First {...} block in Claude's reply, parsed
export function extractJson(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end <= start) throw new Error(`Claude did not return JSON. Reply was: ${text.slice(0, 300)}`);
  return JSON.parse(text.slice(start, end + 1));
}

export function runClaude(prompt, { model, effort, tools = [], timeoutMs = 6 * 60 * 1000 }) {
  fs.mkdirSync(JOBS_ROOT, { recursive: true });
  return new Promise((resolve, reject) => {
    const args = ['-p', '--model', model, '--effort', effort, '--output-format', 'json'];
    if (tools.length) args.push('--allowedTools', tools.join(','));
    const child = spawn('claude', args, { cwd: JOBS_ROOT, windowsHide: true });
    let out = '';
    let err = '';
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`Claude Code took longer than ${Math.round(timeoutMs / 60000)} minutes and was stopped.`));
    }, timeoutMs);
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { err += d; });
    child.on('error', (e) => {
      clearTimeout(timer);
      reject(new Error(e.code === 'ENOENT'
        ? 'Claude Code is not installed or not on PATH (the `claude` command was not found).'
        : e.message));
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      let res;
      try { res = JSON.parse(out); } catch {
        return reject(new Error(`Claude Code failed (exit ${code}). ${(err || out).slice(0, 400)}`));
      }
      if (res.is_error) return reject(new Error(`Claude Code error: ${String(res.result || res.subtype).slice(0, 400)}`));
      resolve({ text: res.result || '', durationMs: res.duration_ms, denied: res.permission_denials || [] });
    });
    child.stdin.end(prompt);
  });
}
