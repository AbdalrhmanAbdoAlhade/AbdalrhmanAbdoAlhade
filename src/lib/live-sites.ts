export const LIVE_ECOSYSTEM = [
  "gefco.sa",
  "alahrm.com",
  "edustationsegy.com",
  "playprodammam.com",
  "alimny.zh-innovation.tech",
  "asas-al-jawhara.rouqy-jewellery.com",
  "coordinator-reg.rouqy-jewellery.com",
  "link.rouqy-jewellery.com",
  "services.rouqy-jewellery.com",
  "faz-an.com",
  "billpro-sa.com",
  "lavanderesto.com",
  "quickcart.rouqy-jewellery.com",
  "lawyer.rouqy-jewellery.com",
  // Featured mobile applications and live app links
  "play.google.com/store/apps/details?id=com.kera.zhcoding&hl=ar",
  "play.google.com/store/apps/details?id=umq.app.umq&hl=ar",
  "play.google.com/store/games?hl=ar",
  "play.google.com/store/apps/details?id=com.zala3ba.zala3baapp&hl=ar",
  // Additional live ecosystem links
  "zh-innovation.com",
  "growth-fast.netlify.app",
  "noverys-cars.netlify.app",
  "neocampus-site.netlify.app",
  "linktree.souqna-sa.com",
  "linktree.faz-an.com",
  "devotix-media.faz-an.com",
  "3asaf-perfumes.netlify.app",
  "abdaealmasi.store",
  "aflaj-cd.sa",
  "aflaj-cd.store",
  "aflajaskhia.sa",
  "ahsinalhadith.sa",
  "alastura.com",
  "alastura.tech",
  "albabir-cd.sa",
  "albabir-cd.site",
  "albabir-cd.store",
  "albabir.sa",
  "alghala-q.sa",
  "alrayith-br.sa",
  "alrayith-d.sa",
  "alsarayje.com",
  "altanmia-alia.sa",
  "altanmia-alia.site",
  "altanmia-alia.store",
  "alyateem.com",
  "amayer-hs.sa",
  "amayer-hs.store",
  "ambari-q.sa",
  "asiruh-m.sa",
  "ehsan-e.sa",
  "hayahwaqf.com",
  "kera.sa",
  "luxurytouch.net",
  "mabnaa.online",
  "mabniun.shop",
  "mahalani-br.sa",
  "maqzaa-ber.sa",
  "masaged.com",
  "meal.sa",
  "migzabir.com",
  "modernmas.sa",
  "muzhira-cd.sa",
  "nice-store.netlify.app",
  "q-kubara.sa",
  "quran-es.sa",
  "quran.com",
  "rithbir.com",
  "sabia-cd.sa",
  "souqna-sa.com",
  "sptraining.sa",
  "tahfizali.com",
  "umq.sa",
  "walidaeen.com",
  "waqf-yateem.com",
  "zh-coding.com",
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
    label = APP_LABELS[entry] ?? (() => {
      const id = /id=([^&]+)/.exec(entry)?.[1];
      return id ? (id.split(".").pop() ?? id) : "";
    })();
  }
  return { url: `https://${entry}`, label, isApp, host };
});

