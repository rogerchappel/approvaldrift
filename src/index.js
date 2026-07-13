import { extractActions } from "./extract.js";
import { classifyActions, loadPolicy, summarize } from "./policy.js";

export { classifyActions, extractActions, loadPolicy, summarize };

export function auditApprovalDrift(transcriptPath, policyPath) {
  const policy = loadPolicy(policyPath);
  const actions = classifyActions(extractActions(transcriptPath), policy);
  return {
    source: {
      transcript: transcriptPath,
      policy: policyPath
    },
    summary: summarize(actions),
    actions
  };
}
