// System
export {
  ThemeProvider,
  useTheme,
  type Theme,
  type ThemeProviderProps,
  type ThemeContextValue,
} from './system/ThemeProvider';

// Atoms
export { ThemeToggle, type ThemeToggleProps } from './atoms/ThemeToggle';
export { Icon, type IconProps, type IconSize } from './atoms/Icon';
export { Button, buttonVariants, type ButtonProps } from './atoms/Button';
export { Text, textVariants, type TextProps } from './atoms/Text';
export { Heading, headingVariants, type HeadingProps } from './atoms/Heading';
export {
  ToggleGroup,
  ToggleGroupItem,
  toggleGroupItemVariants,
  type ToggleGroupProps,
  type ToggleGroupItemProps,
} from './atoms/ToggleGroup';
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  avatarVariants,
  type AvatarProps,
} from './atoms/Avatar';
export { Slider, type SliderProps } from './atoms/Slider';
export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  type HoverCardContentProps,
} from './atoms/HoverCard';
export { ScrollArea, ScrollBar, type ScrollAreaProps } from './atoms/ScrollArea';
export { AspectRatio, type AspectRatioProps } from './atoms/AspectRatio';
export { Badge, badgeVariants, type BadgeProps } from './atoms/Badge';
export { Code, CodeBlock, type CodeProps, type CodeBlockProps } from './atoms/Code';
export { Input, inputVariants, type InputProps } from './atoms/Input';
export { Link, linkVariants, type LinkProps } from './atoms/Link';
export {
  Checkbox,
  type CheckboxProps,
} from './atoms/Checkbox';
export {
  Switch,
  type SwitchProps,
} from './atoms/Switch';
export {
  Radio,
  type RadioProps,
} from './atoms/Radio';
export { Tooltip, type TooltipProps } from './atoms/Tooltip';
export { Separator, type SeparatorProps } from './atoms/Separator';
export { Label, type LabelProps } from './atoms/Label';
export { Kbd, kbdVariants, type KbdProps } from './atoms/Kbd';
export {
  Alert,
  alertVariants,
  AlertTitle,
  AlertDescription,
  AlertClose,
  type AlertProps,
  type AlertTitleProps,
  type AlertDescriptionProps,
} from './atoms/Alert';
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  type PopoverContentProps,
} from './atoms/Popover';
export {
  Progress,
  progressTrackVariants,
  progressIndicatorVariants,
  type ProgressProps,
} from './atoms/Progress';
export {
  Spinner,
  spinnerVariants,
  type SpinnerProps,
} from './atoms/Spinner';
export { Spoiler, type SpoilerProps } from './atoms/Spoiler';
export {
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  SkeletonKeyframes,
  type SkeletonProps,
  type SkeletonTextProps,
  type SkeletonCircleProps,
} from './atoms/Skeleton';

export {
  VisuallyHidden,
  type VisuallyHiddenProps,
} from './atoms/VisuallyHidden';

export {
  Tag,
  tagVariants,
  type TagProps,
} from './atoms/Tag';

export {
  NumberInput,
  numberInputVariants,
  type NumberInputProps,
} from './atoms/NumberInput';
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  type InputOTPProps,
  type InputOTPGroupProps,
  type InputOTPSlotProps,
  type InputOTPSeparatorProps,
} from './atoms/InputOTP';
export {
  Blockquote,
  BlockquoteCitation,
  type BlockquoteProps,
  type BlockquoteCitationProps,
} from './atoms/Blockquote';
export { CopyButton, type CopyButtonProps } from './atoms/CopyButton';
export { Image, imageVariants, type ImageProps } from './atoms/Image';
export { Toggle, toggleVariants, type ToggleProps } from './atoms/Toggle';
export {
  Banner,
  bannerVariants,
  BannerContent,
  type BannerProps,
  type BannerContentProps,
} from './atoms/Banner';
export { Rating, type RatingProps } from './atoms/Rating';
export { Highlight, type HighlightProps } from './atoms/Highlight';
export {
  SegmentedControl,
  type SegmentedControlProps,
} from './atoms/SegmentedControl';

// Molecules
export { SearchInput, type SearchInputProps } from './molecules/SearchInput';
export { PasswordInput, type PasswordInputProps } from './molecules/PasswordInput';
export { LoadingOverlay, type LoadingOverlayProps } from './molecules/LoadingOverlay';
export { InputField, type InputFieldProps } from './molecules/InputField';
export { CheckboxField, type CheckboxFieldProps } from './molecules/CheckboxField';
export { SwitchField, type SwitchFieldProps } from './molecules/SwitchField';
export { ProgressField, type ProgressFieldProps } from './molecules/ProgressField';
export {
  DatePicker,
  DateRangePicker,
  Calendar,
  type DatePickerProps,
  type DateRangePickerProps,
  type CalendarProps,
  type DateRange,
} from './molecules/DatePicker';
export {
  TimePicker,
  type TimePickerProps,
} from './molecules/TimePicker';
export {
  Select,
  MultiSelect,
  type SelectProps,
  type SelectOption,
  type SelectGroup,
  type SelectOptions,
  type MultiSelectProps,
} from './molecules/Select';
export {
  Combobox,
  type ComboboxProps,
  type ComboboxOption,
  type ComboboxGroup,
  type ComboboxOptions,
} from './molecules/Combobox';
export {
  ColorPicker,
  type ColorPickerProps,
} from './molecules/ColorPicker';
export {
  Textarea,
  textareaVariants,
  type TextareaProps,
} from './molecules/Textarea';
export {
  FileUpload,
  type FileUploadProps,
  type UploadedFile,
} from './molecules/FileUpload';
export {
  Toast,
  ToastProvider,
  useToast,
  toastVariants,
  type ToastProps,
  type ToastProviderProps,
  type ToastData,
  type ToastVariant,
} from './molecules/Toast';
export {
  RadioGroup,
  type RadioGroupProps,
} from './molecules/RadioGroup';
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
} from './molecules/Tabs';
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
} from './molecules/Accordion';
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  type DropdownMenuProps,
  type DropdownMenuTriggerProps,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuLabelProps,
} from './molecules/DropdownMenu';
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuShortcut,
  type ContextMenuProps,
  type ContextMenuTriggerProps,
  type ContextMenuContentProps,
  type ContextMenuItemProps,
  type ContextMenuSeparatorProps,
  type ContextMenuLabelProps,
  type ContextMenuShortcutProps,
} from './molecules/ContextMenu';
export {
  Pagination,
  type PaginationProps,
} from './molecules/Pagination';
export { EmptyState, type EmptyStateProps } from './molecules/EmptyState';
export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  type SheetContentProps,
} from './molecules/Sheet';
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  type DialogContentProps,
} from './molecules/Dialog';
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  type AlertDialogContentProps,
  type AlertDialogActionProps,
  type AlertDialogCancelProps,
} from './molecules/AlertDialog';
export {
  useConfirm,
  type ConfirmOptions,
  type UseConfirmReturn,
} from './molecules/ConfirmDialog';
export {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbSeparator,
  type BreadcrumbsProps,
  type BreadcrumbItemProps,
} from './molecules/Breadcrumbs';
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  type CollapsibleProps,
  type CollapsibleContentProps,
} from './molecules/Collapsible';
export {
  Form,
  FormField,
  FormFieldController,
  FormMessage,
  useZodForm,
  useFormContext,
  z,
  type FormProps,
  type FormFieldProps,
  type FormFieldControllerProps,
  type FormMessageProps,
  type UseFormReturn,
  type SubmitHandler,
  type ControllerRenderProps,
} from './molecules/Form';
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
  type NavigationMenuProps,
  type NavigationMenuListProps,
  type NavigationMenuItemProps,
  type NavigationMenuTriggerProps,
  type NavigationMenuContentProps,
  type NavigationMenuLinkProps,
} from './molecules/NavigationMenu';
export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  type MenubarProps,
  type MenubarMenuProps,
  type MenubarTriggerProps,
  type MenubarContentProps,
  type MenubarItemProps,
  type MenubarSeparatorProps,
  type MenubarLabelProps,
  type MenubarShortcutProps,
  type MenubarCheckboxItemProps,
  type MenubarRadioGroupProps,
  type MenubarRadioItemProps,
} from './molecules/Menubar';
export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  type DrawerProps,
  type DrawerContentProps,
  type DrawerHeaderProps,
  type DrawerTitleProps,
  type DrawerDescriptionProps,
  type DrawerFooterProps,
} from './molecules/Drawer';

// Organisms
export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  cardVariants,
  type CardProps,
  type CardHeaderProps,
  type CardBodyProps,
  type CardFooterProps,
} from './atoms/Card';

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  type TableProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableRowProps,
  type TableHeadProps,
  type TableCellProps,
} from './organisms/Table';
export {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  type DataTableProps,
} from './organisms/DataTable';

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  modalContentVariants,
  type ModalProps,
  type ModalContentProps,
  type ModalHeaderProps,
  type ModalTitleProps,
  type ModalDescriptionProps,
  type ModalBodyProps,
  type ModalFooterProps,
  type ModalTriggerProps,
} from './organisms/Modal';

export {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
  type ChartContainerProps,
  type ChartTooltipContentProps,
  type ChartLegendContentProps,
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  Line,
  Bar,
  Area,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  ResponsiveContainer,
} from './organisms/Chart';

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  type CommandProps,
} from './organisms/Command';

export {
  StatCard,
  statCardVariants,
  type StatCardProps,
} from './organisms/StatCard';

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarCollapseButton,
  useSidebar,
  type SidebarProps,
  type SidebarHeaderProps,
  type SidebarContentProps,
  type SidebarFooterProps,
  type SidebarGroupProps,
  type SidebarItemProps,
  type SidebarCollapseButtonProps,
} from './organisms/Sidebar';

export {
  AppHeader,
  type AppHeaderProps,
} from './organisms/AppHeader';

export {
  AppFooter,
  type AppFooterProps,
} from './organisms/AppFooter';

export {
  Carousel,
  CarouselItem,
  type CarouselProps,
  type CarouselItemProps,
} from './organisms/Carousel';

export {
  Tree,
  type TreeProps,
  type TreeNode,
} from './organisms/Tree';

export {
  Timeline,
  TimelineItem,
  type TimelineProps,
  type TimelineItemProps,
} from './organisms/Timeline';

export {
  Stepper,
  type StepperProps,
  type StepperStep,
} from './molecules/Stepper';
export {
  Toolbar,
  ToolbarButton,
  ToolbarLink,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  ToolbarSeparator,
  type ToolbarProps,
  type ToolbarButtonProps,
  type ToolbarLinkProps,
  type ToolbarToggleGroupProps,
  type ToolbarToggleItemProps,
  type ToolbarSeparatorProps,
} from './molecules/Toolbar';
export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  type ResizablePanelGroupProps,
  type ResizablePanelProps,
  type ResizableHandleProps,
} from './molecules/Resizable';
export {
  SearchFilter,
  type SearchFilterProps,
} from './molecules/SearchFilter';

// Templates
export {
  PageShell,
  usePageShell,
  type PageShellProps,
  type PageShellHeaderProps,
  type PageShellSidebarProps,
  type PageShellContentProps,
  type PageShellFooterProps,
} from './templates/PageShell';

export {
  DashboardLayout,
  useDashboardLayout,
  type DashboardLayoutProps,
  type DashboardLayoutHeaderProps,
  type DashboardLayoutSidebarProps,
  type DashboardLayoutContentProps,
  type DashboardLayoutFooterProps,
} from './templates/DashboardLayout';

export {
  AuthLayout,
  type AuthLayoutProps,
} from './templates/AuthLayout';

export {
  FormPage,
  type FormPageProps,
  type FormPageHeaderProps,
  type FormPageBodyProps,
  type FormPageActionsProps,
} from './templates/FormPage';

export {
  ListPage,
  type ListPageProps,
  type ListPageHeaderProps,
  type ListPageToolbarProps,
  type ListPageBodyProps,
  type ListPageFooterProps,
} from './templates/ListPage';

export {
  EmptyStatePage,
  type EmptyStatePageProps,
} from './templates/EmptyStatePage';

export {
  DetailPage,
  type DetailPageProps,
  type DetailPageHeaderProps,
  type DetailPageContentProps,
  type DetailPageSidebarProps,
  type DetailPageBodyProps,
} from './templates/DetailPage';

export {
  ErrorPage,
  type ErrorPageProps,
} from './templates/ErrorPage';

// ─── Patterns ──────────────────────────────────────────────────────────────────
export { DataTablePattern } from './patterns/DataTablePattern';
export type { DataTablePatternProps } from './patterns/DataTablePattern';
export { FormWizard } from './patterns/FormWizard';
export type { FormWizardProps, FormWizardStep } from './patterns/FormWizard';
export { FileUploadZone } from './patterns/FileUploadZone';
export type { FileUploadZoneProps, FileUploadZoneFile, FileUploadZoneStatus } from './patterns/FileUploadZone';

// Utils
export { cn } from './utils/cn';
