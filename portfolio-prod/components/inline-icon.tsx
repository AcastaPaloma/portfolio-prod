import type { ReactNode } from "react";
import Image from "next/image";
const brands:Record<string,string>={waterloo:"waterloo.svg","morgan-stanley":"morgan-stanley.webp",neuropoly:"neuropoly.webp",pinata:"pinata.webp",reflex:"reflex.webp"};
const paths:Record<string,ReactNode>={
 resume:<><path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v5h4M9 12h6M9 16h6"/></>,
 linkedin:<><rect x="4" y="4" width="16" height="16" rx="1"/><path d="M8 10v7M12 17v-7M12 13c0-4 5-4 5 0v4M8 7v.1"/></>,
 email:<><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 6 9 7 9-7"/></>,
 quantum:<><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(55 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-55 12 12)"/></>,
 network:<><circle cx="6" cy="6" r="3"/><circle cx="18" cy="9" r="3"/><circle cx="10" cy="19" r="3"/><path d="m9 7 6 1M7 9l2 7m7-5-4 6"/></>,
 code:<><path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16"/></>,
 coffee:<><path d="M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5ZM17 9h2a3 3 0 0 1 0 6h-2M7 3v2M12 3v2"/></>,
};
export function InlineIcon({name}:{name:string}){return brands[name]?<Image unoptimized className="inline-icon brand-icon" src={`/icons/${brands[name]}`} width={18} height={18} alt="" aria-hidden="true"/>:<svg className="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;}
