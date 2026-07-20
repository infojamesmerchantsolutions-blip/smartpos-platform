import {
  Activity,
  CreditCard,
  Landmark,
  Wallet,
  Cpu,
  Shield,
  Settings,
  LayoutDashboard,
  Building2,
  MonitorSmartphone,
  ArrowRightLeft,
  Receipt,
  Webhook,
  Users,
  KeyRound,
  FileText,
  Bell,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Payments",
    icon: CreditCard,
    children: [
      {
        title: "Payment Intents",
        href: "/dashboard/payment-intents",
        icon: ArrowRightLeft,
      },
      {
        title: "Transactions",
        href: "/dashboard/transactions",
        icon: Receipt,
      },
      {
        title: "Settlements",
        href: "/dashboard/settlements",
        icon: Landmark,
      },
    ],
  },

  {
    title: "Merchants",
    icon: Building2,
    children: [
      {
        title: "Merchants",
        href: "/dashboard/merchants",
        icon: Building2,
      },
      {
        title: "Terminals",
        href: "/dashboard/terminals",
        icon: MonitorSmartphone,
      },
    ],
  },

  {
    title: "Wallets",
    icon: Wallet,
    children: [
      {
        title: "Wallets",
        href: "/dashboard/wallets",
        icon: Wallet,
      },
      {
        title: "Exchange Rates",
        href: "/dashboard/exchange",
        icon: Activity,
      },
      {
        title: "Blockchain",
        href: "/dashboard/blockchain",
        icon: Cpu,
      },
    ],
  },

  {
    title: "Infrastructure",
    icon: Activity,
    children: [
      {
        title: "Gateway Routing",
        href: "/dashboard/gateways",
        icon: Activity,
      },
      {
        title: "Gateway Health",
        href: "/dashboard/gateway-health",
        icon: Shield,
      },
      {
        title: "Webhooks",
        href: "/dashboard/webhooks",
        icon: Webhook,
      },
    ],
  },

  {
    title: "Administration",
    icon: Users,
    children: [
      {
        title: "Users",
        href: "/dashboard/users",
        icon: Users,
      },
      {
        title: "API Keys",
        href: "/dashboard/api-keys",
        icon: KeyRound,
      },
    ],
  },

  {
    title: "System",
    icon: Settings,
    children: [
      {
        title: "Audit Logs",
        href: "/dashboard/audit-logs",
        icon: FileText,
      },
      {
        title: "Notifications",
        href: "/dashboard/notifications",
        icon: Bell,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];