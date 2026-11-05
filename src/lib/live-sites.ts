export const LIVE_ECOSYSTEM = [
  // Live websites
  "gefco.sa",
  "faz-an.com",
  "edustationsegy.com",
  "playprodammam.com",
  "erth-alsham.com",
  "durar.rouqy-jewellery.com",
  "asas-al-jawhara.rouqy-jewellery.com",
  "zensacafe.com",
  "toy.rouqy-jewellery.com",
  "ast-oman.com",
  "billpro-sa.com",
  "lavanderesto.com",
  "abdaealmasi.store",
  "alimny.zh-innovation.tech",
  "coordinator-reg.rouqy-jewellery.com",
  "link.rouqy-jewellery.com",
  "services.rouqy-jewellery.com",
  "alastura.com",
  "alastura.tech",
  "alyateem.com",
  "kera.sa",
  "masaged.com",
  "quran.com",
  "sptraining.sa",
  "umq.sa",
  "zh-innovation.com",
  "linktree.souqna-sa.com",
  "linktree.faz-an.com",
  "devotix-media.faz-an.com",
  "quickcart.rouqy-jewellery.com",
  "rouqy-jewellery.com",
  "souqna-sa.com",
  "lawyer.rouqy-jewellery.com",
  "alahrm.com",
  // Featured mobile applications and live app links
  "play.google.com/store/apps/details?id=com.kera.zhcoding&hl=ar",
  "play.google.com/store/apps/details?id=umq.app.umq&hl=ar",
  "play.google.com/store/games?hl=ar",
  "play.google.com/store/apps/details?id=com.zala3ba.zala3baapp&hl=ar",
];

export type LiveSite = {
  url: string;
  label: string;
  isApp: boolean;
  host: string;
};

const APP_LABELS: Record<string, string> = {
  "play.google.com/store/apps/details?id=com.kera.zhcoding&hl=ar": "FAZ",
  "play.google.com/store/apps/details?id=umq.app.umq&hl=ar": "UMQ",
  "play.google.com/store/games?hl=ar": "رقي",
  "play.google.com/store/apps/details?id=com.zala3ba.zala3baapp&hl=ar": "Zala3ba",
};

export const liveSites: LiveSite[] = LIVE_ECOSYSTEM.map((entry) => {
  const isApp = entry.startsWith("play.google.com");
  const host = entry.split("/")[0] ?? entry;
  let label: string = host;
  if (isApp) {
    label =
      APP_LABELS[entry] ??
      (() => {
        const id = /id=([^&]+)/.exec(entry)?.[1];
        return id ? (id.split(".").pop() ?? id) : "";
      })();
  }
  return { url: `https://${entry}`, label, isApp, host };
});
