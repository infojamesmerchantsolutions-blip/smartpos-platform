#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="/workspaces/smartpos-platform"
FRONTEND="$PROJECT_ROOT/frontend"
PORT="3001"
LOG_FILE="$PROJECT_ROOT/frontend-next.log"

echo "=========================================="
echo " SmartPOS FINAL Frontend + Tunnel Repair"
echo "=========================================="

cd "$PROJECT_ROOT"

echo ""
echo "[1/10] Checking frontend..."

if [ ! -d "$FRONTEND" ]; then
  echo "ERROR: $FRONTEND does not exist."
  exit 1
fi

if [ ! -f "$FRONTEND/package.json" ]; then
  echo "ERROR: $FRONTEND/package.json does not exist."
  exit 1
fi

echo "OK: Frontend found."

echo ""
echo "[2/10] Checking required routes..."

for route in \
  "$FRONTEND/app/page.tsx" \
  "$FRONTEND/app/login/page.tsx" \
  "$FRONTEND/app/dashboard/page.tsx"
do
  if [ ! -f "$route" ]; then
    echo "ERROR: Missing route file:"
    echo "$route"
    exit 1
  fi
done

echo "OK: Required route files exist."

echo ""
echo "[3/10] Backing up frontend..."

BACKUP="$PROJECT_ROOT/frontend-backup-final-$(date +%Y%m%d-%H%M%S)"

cp -R "$FRONTEND" "$BACKUP"

echo "Backup created:"
echo "$BACKUP"

echo ""
echo "[4/10] Fixing Next.js workspace configuration..."

cd "$FRONTEND"

cat > next.config.ts <<'EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "/workspaces/smartpos-platform/frontend",
  },
};

export default nextConfig;
EOF

echo "Updated next.config.ts"

echo ""
echo "[5/10] Clearing stale Next.js build state..."

rm -rf .next
rm -f tsconfig.tsbuildinfo

echo "Removed .next and tsconfig.tsbuildinfo"

echo ""
echo "[6/10] Checking port 3001..."

PIDS=$(lsof -ti tcp:$PORT || true)

if [ -n "$PIDS" ]; then
  echo "Stopping processes on port $PORT:"
  echo "$PIDS"

  kill $PIDS 2>/dev/null || true
  sleep 2

  PIDS2=$(lsof -ti tcp:$PORT || true)

  if [ -n "$PIDS2" ]; then
    kill -9 $PIDS2 2>/dev/null || true
  fi
fi

echo "Port $PORT is clear."

echo ""
echo "[7/10] Starting clean Next.js server..."

rm -f "$LOG_FILE"

cd "$FRONTEND"

nohup npm run dev -- --hostname 0.0.0.0 --port "$PORT" \
  > "$LOG_FILE" 2>&1 &

NEXT_PID=$!

echo "Next.js PID: $NEXT_PID"
echo "Log file: $LOG_FILE"

echo ""
echo "Waiting for Next.js..."

for i in {1..30}; do
  if curl -sf "http://localhost:$PORT/" > /dev/null; then
    echo "Next.js is ready."
    break
  fi

  if ! kill -0 "$NEXT_PID" 2>/dev/null; then
    echo "ERROR: Next.js stopped unexpectedly."
    cat "$LOG_FILE"
    exit 1
  fi

  sleep 1
done

if ! curl -sf "http://localhost:$PORT/" > /dev/null; then
  echo "ERROR: Next.js did not become ready."
  cat "$LOG_FILE"
  exit 1
fi

echo ""
echo "[8/10] Testing local routes..."

for ROUTE in "/" "/login" "/dashboard"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    "http://localhost:$PORT$ROUTE")

  echo "$ROUTE -> HTTP $STATUS"

  if [ "$STATUS" != "200" ]; then
    echo "ERROR: Local route failed: $ROUTE"
    exit 1
  fi
done

echo ""
echo "[9/10] Configuring Codespaces port visibility..."

gh codespace ports visibility \
  "$PORT:public" \
  --codespace friendly-space-fishstick-r4j46545qgvgf5w9

echo "Port $PORT set to public."

echo ""
echo "[10/10] Testing public tunnel..."

PUBLIC_URL="https://friendly-space-fishstick-r4j46545qgvgf5w9-${PORT}.app.github.dev"

echo ""
echo "Public URL:"
echo "$PUBLIC_URL"

echo ""
echo "Testing public routes..."

for ROUTE in "/" "/login" "/dashboard"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    "$PUBLIC_URL$ROUTE")

  echo "$PUBLIC_URL$ROUTE -> HTTP $STATUS"

  if [ "$STATUS" != "200" ]; then
    echo ""
    echo "WARNING: Public route returned HTTP $STATUS"
    echo "The local server is healthy, but the Codespaces tunnel is not."
  fi
done

echo ""
echo "=========================================="
echo " FINAL STATUS"
echo "=========================================="

echo ""
echo "Next.js PID:"
echo "$NEXT_PID"

echo ""
echo "Local:"
echo "http://localhost:$PORT/login"

echo ""
echo "Public:"
echo "$PUBLIC_URL/login"

echo ""
echo "Recent logs:"
echo "------------------------------------------"

tail -n 30 "$LOG_FILE"

echo ""
echo "=========================================="
echo " DONE"
echo "=========================================="
