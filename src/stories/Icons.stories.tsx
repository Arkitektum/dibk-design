import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AddIcon,
  AdvarselIcon,
  AdvarselIconFilled,
  ArbeidstilsynetLogo,
  ArrowIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  AsteriskIcon,
  CalendarIcon,
  CancelIcon,
  CancelIconFilled,
  CheckmarkCircleIcon,
  CheckmarkSymbolIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  DeleteBinIcon,
  DeleteIcon,
  DibkLogo,
  DibkLogoWithTitle,
  DownloadIcon,
  EditIcon,
  EditMultipleIcon,
  ErrorCircleIcon,
  ErrorIcon,
  ExpandIcon,
  ExternalLinkIcon,
  FilterIcon,
  HelpIcon,
  HideIcon,
  IdPortenIcon,
  InfoIcon,
  LockIcon,
  LogoutIcon,
  MailIcon,
  MenuIcon,
  MinimizeIcon,
  PersonAddFilledIcon,
  PersonAddIcon,
  PhoneIcon,
  RefreshIcon,
  SearchIcon,
  ShowIcon,
  SortIcon,
  StatusIcon,
  SuccessIcon,
  SuccessIconFilled,
  SwapIcon,
  UserIcon,
  WarningIcon,
  XSymbolIcon,
} from "../icons";

const meta: Meta = {
  title: "Assets/Icons",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const iconComponents = [
  { name: "AddIcon", Component: AddIcon },
  { name: "AdvarselIcon", Component: AdvarselIcon },
  { name: "AdvarselIconFilled", Component: AdvarselIconFilled },
  { name: "ArbeidstilsynetLogo", Component: ArbeidstilsynetLogo, maxWidth: 200 },
  { name: "ArrowIcon", Component: ArrowIcon },
  { name: "ArrowLeftIcon", Component: ArrowLeftIcon },
  { name: "ArrowRightIcon", Component: ArrowRightIcon },
  { name: "AsteriskIcon", Component: AsteriskIcon },
  { name: "CalendarIcon", Component: CalendarIcon },
  { name: "CancelIcon", Component: CancelIcon },
  { name: "CancelIconFilled", Component: CancelIconFilled },
  { name: "CheckmarkCircleIcon", Component: CheckmarkCircleIcon },
  { name: "CheckmarkSymbolIcon", Component: CheckmarkSymbolIcon },
  { name: "ChevronDownIcon", Component: ChevronDownIcon },
  { name: "ChevronLeftIcon", Component: ChevronLeftIcon },
  { name: "ChevronRightIcon", Component: ChevronRightIcon },
  { name: "ChevronUpIcon", Component: ChevronUpIcon },
  { name: "DeleteBinIcon", Component: DeleteBinIcon },
  { name: "DeleteIcon", Component: DeleteIcon },
  { name: "DibkLogo", Component: DibkLogo, maxWidth: 140 },
  { name: "DibkLogoWithTitle", Component: DibkLogoWithTitle, maxWidth: 220 },
  { name: "DownloadIcon", Component: DownloadIcon },
  { name: "EditIcon", Component: EditIcon },
  { name: "EditMultipleIcon", Component: EditMultipleIcon },
  { name: "ErrorCircleIcon", Component: ErrorCircleIcon },
  { name: "ErrorIcon", Component: ErrorIcon },
  { name: "ExpandIcon", Component: ExpandIcon },
  { name: "ExternalLinkIcon", Component: ExternalLinkIcon },
  { name: "FilterIcon", Component: FilterIcon },
  { name: "HelpIcon", Component: HelpIcon },
  { name: "HideIcon", Component: HideIcon },
  { name: "IdPortenIcon", Component: IdPortenIcon },
  { name: "InfoIcon", Component: InfoIcon },
  { name: "LockIcon", Component: LockIcon },
  { name: "LogoutIcon", Component: LogoutIcon },
  { name: "MailIcon", Component: MailIcon },
  { name: "MenuIcon", Component: MenuIcon },
  { name: "MinimizeIcon", Component: MinimizeIcon },
  { name: "PersonAddFilledIcon", Component: PersonAddFilledIcon },
  { name: "PersonAddIcon", Component: PersonAddIcon },
  { name: "PhoneIcon", Component: PhoneIcon },
  { name: "RefreshIcon", Component: RefreshIcon },
  { name: "SearchIcon", Component: SearchIcon },
  { name: "ShowIcon", Component: ShowIcon },
  { name: "SortIcon", Component: SortIcon },
  { name: "StatusIcon", Component: StatusIcon },
  { name: "SuccessIcon", Component: SuccessIcon },
  { name: "SuccessIconFilled", Component: SuccessIconFilled },
  { name: "SwapIcon", Component: SwapIcon },
  { name: "UserIcon", Component: UserIcon },
  { name: "WarningIcon", Component: WarningIcon },
  { name: "XSymbolIcon", Component: XSymbolIcon },
];

export const Icons: Story = {
  render: () => (
    <div
      style={{
        padding: "24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px",
        background: "#f5f6f7",
        minHeight: "100vh",
      }}
    >
      {iconComponents.map(({ name, Component, maxWidth }) => (
        <div
          key={name}
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "100%",
              minHeight: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Component
              style={{
                width: "100%",
                height: "auto",
                maxWidth: maxWidth ?? 64,
                maxHeight: 64,
              }}
              aria-hidden="true"
            />
          </div>
          <code style={{ fontSize: "12px", color: "#374151" }}>{name}</code>
        </div>
      ))}
    </div>
  ),
};

export const IconStylingExample: Story = {
  render: () => (
    <div
      style={{
        padding: "24px",
        background: "#f5f6f7",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        <div style={{ fontSize: "14px", color: "#111827", marginBottom: "8px" }}>
          Styling example (currentColor via props/style)
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ color: "#005275", display: "flex", alignItems: "center" }}>
            <MailIcon style={{ width: 24, height: 24 }} aria-hidden="true" />
          </div>
          <div style={{ color: "#b91c1c", display: "flex", alignItems: "center" }}>
            <DeleteBinIcon style={{ width: 20, height: 20 }} aria-hidden="true" />
          </div>
          <SearchIcon
            style={{
              width: 22,
              height: 22,
              color: "#0f766e",
              background: "#ccfbf1",
              padding: "6px",
              borderRadius: "10px",
            }}
            aria-hidden="true"
          />
          <FilterIcon
            style={{
              width: 22,
              height: 22,
              color: "#1f2937",
              background: "#e5e7eb",
              padding: "6px",
              borderRadius: "999px",
            }}
            aria-hidden="true"
          />
          <div
            style={{
              background: "#111827",
              color: "#ffffff",
              borderRadius: "999px",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PhoneIcon style={{ width: 20, height: 20 }} aria-hidden="true" />
          </div>
          <div
            style={{
              background: "#e0f2fe",
              color: "#0369a1",
              borderRadius: "8px",
              padding: "6px 10px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <PersonAddFilledIcon style={{ width: 18, height: 18 }} aria-hidden="true" />
            <span style={{ fontSize: "12px" }}>Invite</span>
          </div>
        </div>
        <pre
          style={{
            marginTop: "16px",
            padding: "12px",
            background: "#0b1020",
            color: "#e5e7eb",
            borderRadius: "6px",
            overflowX: "auto",
            fontSize: "12px",
            lineHeight: 1.5,
          }}
        >
          <code>{`import { MailIcon, DeleteBinIcon, SearchIcon, FilterIcon } from "dibk-design";

<MailIcon style={{ color: "#005275", width: 24, height: 24 }} />
<DeleteBinIcon style={{ color: "#b91c1c", width: 20, height: 20 }} />
<SearchIcon
  style={{
    color: "#0f766e",
    background: "#ccfbf1",
    padding: "6px",
    borderRadius: "10px",
    width: 22,
    height: 22,
  }}
/>
<FilterIcon
  style={{
    color: "#1f2937",
    background: "#e5e7eb",
    padding: "6px",
    borderRadius: "999px",
    width: 22,
    height: 22,
  }}
/>
`}</code>
        </pre>
      </div>
    </div>
  ),
};
