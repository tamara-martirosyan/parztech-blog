import { SHARE_NETWORKS } from "@/features/share/constants";

export const TELEGRAM_NETWORK = SHARE_NETWORKS.find(
  (network) => network.id === "telegram",
)!;

export const TELEGRAM_CARD_TITLE = "Միացիր ParzTech-ի Telegram ալիքին";
export const TELEGRAM_CARD_TEXT =
  "Նոր հոդվածների մասին կիմանաս առաջինը՝ անմիջապես Telegram-ում։";
export const TELEGRAM_JOIN_LABEL = "Միանալ";
export const TELEGRAM_FOOTER_LABEL = "Մեր Telegram ալիքը";
export const READ_POST_LABEL = "Կարդալ հոդվածը →";
