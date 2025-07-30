#!/bin/bash
cd /home/kavia/workspace/code-generation/fan-engagement-analytics-dashboard-18823-18832/fan_engagement_analytics_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

