import json
import os
import urllib.request

payload = {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    'summary': 'Playwright Tests failed',
    'themeColor': 'D13438',
    'title': 'Playwright Tests failed',
    'sections': [
        {
            'facts': [
                {'name': 'Pull request title', 'value': os.environ['PR_TITLE']},
                {'name': 'PR author', 'value': os.environ['PR_AUTHOR']},
                {'name': 'Branch name', 'value': os.environ['BRANCH_NAME']},
                {'name': 'Workflow run', 'value': os.environ['WORKFLOW_RUN_URL']},
            ],
            'markdown': True,
        }
    ],
}

request = urllib.request.Request(
    os.environ['TEAMS_WEBHOOK_URL'],
    data=json.dumps(payload).encode('utf-8'),
    headers={'Content-Type': 'application/json'},
)

with urllib.request.urlopen(request) as response:
    if response.status >= 400:
        raise RuntimeError(f'Teams webhook failed with status {response.status}')