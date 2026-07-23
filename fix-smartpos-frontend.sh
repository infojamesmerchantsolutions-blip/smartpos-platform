#!/usr/bin/env bash

set -e

PROJECT_ROOT="/workspaces/smartpos-platform"
FRONTEND="$PROJECT_ROOT/frontend"
PORT="3001"

echo "=========================================="
echo " SmartPOS Frontend Repair"
echo "=========================================="

cd "$PROJECT_ROOT"

echo ""
echo "[1/9] Checking project structure..."

if [ ! -d "$FRONTEND" ]; then
  echo "ERROR: frontend directory does not exist."
  exit 1
fi

if [ ! -f "$FRONTEND/package.json" ]; then
  echo "ERROR: frontend/package.json does not exist."
  exit 1
fi

cd "$FRONTEND"

echo "Frontend directory: $FRONTEND"

echo ""
echo "[2/9] Creating backup..."

BACKUP_DIR="$PROJECT_ROOT/frontend-backup-$(date +%Y%m%d-%H%M%S)"

mkdir -p "$BACKUP_DIR"

cp -r app "$BACKUP_DIR/" 2>/dev/null || true
cp -r components "$BACKUP_DIR/" 2>/dev/null || true
cp -r features "$BACKUP_DIR/" 2>/dev/null || true
cp -r providers "$BACKUP_DIR/" 2>/dev/null || true
cp -r lib "$BACKUP_DIR/" 2>/dev/null || true
cp tsconfig.json "$BACKUP_DIR/" 2>/dev/null || true
cp next.config.ts "$BACKUP_DIR/" 2>/dev/null || true
cp package.json "$BACKUP_DIR/" 2>/dev/null || true

echo "Backup created at:"
echo "$BACKUP_DIR"

echo ""
echo "[3/9] Verifying LoginForm..."

LOGIN_FORM="features/auth/components/login-form.tsx"

if [ ! -f "$LOGIN_FORM" ]; then
  echo "ERROR: $LOGIN_FORM does not exist."
  echo ""
  echo "Available auth files:"
  find features -path '*auth*' -type f 2>/dev/null | sort || true
  exit 1
fi

echo "Found: $LOGIN_FORM"

echo ""
echo "[4/9] Ensuring /login route exists..."

mkdir -p app/login

cat > app/login/page.tsx <<'EOF'
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <LoginForm />
    </main>
  );
}
EOF

echo "Created/updated: app/login/page.tsx"

echo ""
echo "[5/9] Ensuring root route is consistent..."

cat > app/page.tsx <<'EOF'
import { LoginForm } from "@/features/auth/components/login-form";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <LoginForm />
    </main>
  );
}
EOF

echo "Updated: app/page.tsx"

echo ""
echo "[6/9] Clearing stale Next.js state..."

rm -rf .next
rm -f tsconfig.tsbuildinfo

echo "Removed .next"
echo "Removed tsconfig.tsbuildinfo"

echo ""
echo "[7/9] Checking route files..."

echo ""
echo "Current app routes:"
find app -maxdepth 4 -type f | sort

echo ""
echo "[8/9] Stopping existing process on port $PORT..."

if command -v fuser >/dev/null 2>&1; then
  fuser -k "$PORT/tcp" 2>/dev/null || true
else
  PIDS=$(lsof -ti :"$PORT" 2>/dev/null || true)

  if [ -n "$PIDS" ]; then
    kill $PIDS 2>/dev/null || true
  fi
fi

sleep 2

echo ""
echo "[9/9] Starting Next.js..."

nohup npm run dev -- --hostname 0.0.0.0 --port "$PORT" \
  > "$PROJECT_ROOT/frontend-next.log" 2>&1 &

NEXT_PID=$!

echo "$NEXT_PID" > "$PROJECT_ROOT/frontend-next.pid"

echo ""
echo "Next.js PID: $NEXT_PID"
echo "Log file: $PROJECT_ROOT/frontend-next.log"

echo ""
echo "Waiting for Next.js to start..."

for i in {1..30}; do
  if curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT/" | grep -q "200"; then
    break
  fi

  sleep 1
done

echo ""
echo "=========================================="
echo " Local route tests"
echo "=========================================="

echo ""
echo "ROOT /"
curl -s -o /dev/null -w "HTTP %{http_code}\n" "http://localhost:$PORT/"

echo ""
echo "LOGIN /login"
curl -s -o /dev/null -w "HTTP %{http_code}\n" "http://localhost:$PORT/login"

echo ""
echo "DASHBOARD /dashboard"
curl -s -o /dev/null -w "HTTP %{http_code}\n" "http://localhost:$PORT/dashboard"

echo ""
echo "=========================================="
echo " Next.js process"
echo "=========================================="

ps -p "$NEXT_PID" -o pid,cmd || true

echo ""
echo "=========================================="
echo " Recent Next.js logs"
echo "=========================================="

tail -n 40 "$PROJECT_ROOT/frontend-next.log" || true

echo ""
echo "=========================================="
echo " Public URL"
echo "=========================================="

echo "https://friendly-space-fishstick-r4j46545qgvgf5w9-3001.app.github.dev/"

echo ""
echo "Test login:"
echo "https://friendly-space-fishstick-r4j46545qgvgf5w9-3001.app.github.dev/login"

echo ""
echo "=========================================="
echo " Repair complete"
echo "=========================================="
