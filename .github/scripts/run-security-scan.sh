set +e
yarn npm audit --severity high > yarn-audit.txt 2>&1
audit_exit_code=$?

{
  echo "## Security Scan"
  echo
  if [ "$audit_exit_code" -eq 0 ]; then
    echo "No high or critical vulnerabilities found."
  else
    echo "High or critical vulnerabilities were detected by yarn npm audit --severity high."
    echo
    echo '```text'
    head -n 80 yarn-audit.txt
    echo '```'
  fi
} >> "$GITHUB_STEP_SUMMARY"

exit "$audit_exit_code"