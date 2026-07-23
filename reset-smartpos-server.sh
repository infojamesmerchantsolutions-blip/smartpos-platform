#!/usr/bin/env bash

set -u

PROJECT_ROOT="/workspaces/smartpos-platform"
FRONTEND="$PROJECT_ROOT/frontend"
PORT="3001"
LOG="$PROJECT_ROOT/frontend-next.log"
PID_FILE="$PROJECT_ROOT/frontend-next.pid"
CODESPACE="$(gh codespace list --json name --jq '.[0].name' | head -n 1)"

echo "=========================================="
echo " SmartPOS SERVER HARD RESET"
echo "=========================================="

cd "$PROJECT_ROOT"

echo ""
echo "[1/8] Stopping all processes using port $PORT..."

PIDS="$(sudo lsof -tiTCP:$PORT -sTCP:LISTEN 2>/dev/null || true)"

if [ -n "$PIDS" ]; then
    echo "Found processes:"
    echo "$PIDS"
    sudo kill -9 $PIDS 2>/dev/null || true
else
    echo "No process currently listening on port $PORT."
fi

echo ""
echo "[2/8] Stopping old Next.js processes..."

pkill -f "next dev.*3001" 2>/dev/null || true
pkill -f "npm run dev.*3001" 2>/dev/null || true

sleep 2

echo ""
echo "[3/8] Confirming port $PORT is free..."

if sudo lsof -iTCP:$PORT -sTCP:LISTEN -n -P 2>/dev/null; then
    echo ""
    echo "ERROR: Port $PORT is STILL occupied."
    exit 1
else
    echo "Port $PORT is free."
fi

echo ""
echo "[4/8] Cleaning Next.js state..."

cd "$FRONTEND"

rm -rf .next
rm -f tsconfig.tsbuildinfo

echo "Next.js build state cleared."

echo ""
echo "[5/8] Starting ONE fresh Next.js server..."

rm -f "$LOG" "$PID_FILE"

nohup npm run dev -- --hostname 0.0.0.0 --port "$PORT" > "$LOG" 2>&1 &

SERVER_PID=$!

echo "$SERVER_PID" > "$PID_FILE"

echo "Started PID: $SERVER_PID"

echo ""
echo "[6/8] Waiting for the ACTUAL process to become ready..."

READY=0

for i in {1..30}; do

    if ! kill -0 "$SERVER_PID" 2>/dev/null; then
        echo ""
        echo "ERROR: Next.js process died before becoming ready."
        echo ""
        echo "----- LOG -----"
        cat "$LOG"
        echo "---------------"
        exit 1
    fi

    if curl -fsS "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
        READY=1
        break
    fi

    printf "."
    sleep 1
done

echo ""

if [ "$READY" -ne 1 ]; then
    echo ""
    echo "ERROR: Next.js did not become ready within 30 seconds."
    echo ""
    echo "----- LOG -----"
    cat "$LOG"
    echo "---------------"
    exit 1
fi

echo "Next.js is genuinely ready."

echo ""
echo "[7/8] Testing local routes..."

for ROUTE in "/" "/login" "/dashboard"; do
    STATUS="$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:$PORT$ROUTE")"

    echo "$ROUTE -> HTTP $STATUS"

    if [ "$STATUS" != "200" ]; then
        echo "ERROR: Route $ROUTE failed."
        exit 1
    fi
done

echo ""
echo "[8/8] Checking Codespaces public port..."

if [ -z "$CODESPACE" ]; then
    echo "ERROR: Could not determine Codespace name."
    exit 1
fi

echo "Codespace: $CODESPACE"

gh codespace ports visibility "$PORT:public" --codespace "$CODESPACE"

PUBLIC_URL="https://${CODESPACE}-${PORT}.app.github.dev"

echo ""
echo "Waiting for public tunnel..."

PUBLIC_READY=0

for i in {1..30}; do

    STATUS="$(curl -k -s -o /dev/null -w "%{http_code}" "$PUBLIC_URL/login" || true)"

    if [ "$STATUS" = "200" ]; then
        PUBLIC_READY=1
        break
    fi

    printf "."
    sleep 2
done

echo ""

if [ "$PUBLIC_READY" -ne 1 ]; then
    echo ""
    echo "WARNING: Local server works, but public tunnel did not return HTTP 200."
    echo ""
    echo "Public URL:"
    echo "$PUBLIC_URL"
    echo ""
    echo "Local server is still running."
    echo ""
    echo "----- LOG -----"
    tail -n 50 "$LOG"
    echo "---------------"
    exit 1
fi

echo ""
echo "=========================================="
echo " SUCCESS"
echo "=========================================="

echo ""
echo "Server PID:"
echo "$SERVER_PID"

echo ""
echo "Local:"
echo "http://localhost:$PORT/login"

echo ""
echo "Public:"
echo "$PUBLIC_URL/login"

echo ""
echo "Verified routes:"
echo "  /"
echo "  /login"
echo "  /dashboard"

echo ""
echo "Process listening on port $PORT:"
sudo lsof -iTCP:$PORT -sTCP:LISTEN -n -P || true

echo ""
echo "=========================================="
echo " Server is running correctly."
echo "=========================================="
