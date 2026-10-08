// Compliance check for use_figma. Paste as the script body; set ROOT_ID first.
// Passes when unboundFills, unboundStrokes and unstyledText are all 0.
// Skips image/video paints, invisible paints, and anything inside a node named "OLD · …".
const ROOT_ID = 'PASTE_NODE_ID'; // frame, section or page id

const root = await figma.getNodeByIdAsync(ROOT_ID);
if (!root) throw new Error('Node not found: ' + ROOT_ID);
if (root.type === 'PAGE') await figma.setCurrentPageAsync(root);

const out = { unboundFills: [], unboundStrokes: [], unstyledText: [] };
const isOld = n => /^OLD\s*·/.test(n.name);

function paintIssues(node, key, styleKey) {
  const paints = node[key];
  if (!Array.isArray(paints) || paints.length === 0) return false;
  const styleId = node[styleKey];
  if (typeof styleId === 'string' && styleId !== '') return false; // paint style applied
  return paints.some(p => {
    if (p.visible === false) return false;
    if (p.type === 'IMAGE' || p.type === 'VIDEO') return false;
    if (p.type === 'SOLID') return !(p.boundVariables && p.boundVariables.color);
    // gradients: need a paint style, or every stop bound
    const stops = p.gradientStops || [];
    return !stops.every(s => s.boundVariables && s.boundVariables.color);
  });
}

function walk(node) {
  if (isOld(node)) return;
  const ref = { id: node.id, name: node.name };
  if ('fills' in node && paintIssues(node, 'fills', 'fillStyleId')) out.unboundFills.push(ref);
  if ('strokes' in node && paintIssues(node, 'strokes', 'strokeStyleId')) out.unboundStrokes.push(ref);
  if (node.type === 'TEXT') {
    const ids = node.textStyleId === figma.mixed
      ? node.getStyledTextSegments(['textStyleId']).map(s => s.textStyleId)
      : [node.textStyleId];
    if (ids.some(id => !id)) out.unstyledText.push(ref);
  }
  if ('children' in node) node.children.forEach(walk);
}
walk(root);

const counts = {
  unboundFills: out.unboundFills.length,
  unboundStrokes: out.unboundStrokes.length,
  unstyledText: out.unstyledText.length,
};
return {
  root: { id: root.id, name: root.name },
  pass: Object.values(counts).every(c => c === 0),
  counts,
  // first 25 offenders per kind, enough to fix in one pass
  offenders: {
    unboundFills: out.unboundFills.slice(0, 25),
    unboundStrokes: out.unboundStrokes.slice(0, 25),
    unstyledText: out.unstyledText.slice(0, 25),
  },
};
