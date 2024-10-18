export const recentList: { days: string; id: number; children: { name: string; remark: string; distance: string }[] }[] = [
  { days: '5天前', id: 1, children: [{ name: '中新佳园-二区', remark: '北京市西城区西站南路中新佳园二区', distance: '4 km' }] },
  {
    days: '6天前',
    id: 2,
    children: [{ name: '超级充电站 北京住总万科广场', remark: '大兴区忠凉路1好住总万科广场B2层B2069-B...', distance: '8 km' }],
  },
  {
    days: '1周前',
    id: 3,
    children: [
      { name: '超级充电站 北京经海产业园', remark: '通州区经海四路156号经海产业园地下停B1...', distance: '2 km' },
      { name: '麓枫酒店(北极南站石榴庄地铁站店)', remark: '北京市丰台区光彩路70号世华水岸西区3号楼', distance: '1 km' },
      { name: '超级充电站 北京亦城国际中心', remark: '北京市大兴区住总万科广场B2层B200069-B...', distance: '5 km' },
      { name: '超级充电站 北京亦城国际中心', remark: '北京市大兴区住总万科广场B2层B200069-B...', distance: '5 km' },
    ],
  },
];
export const chargeList: { name: string; remark: string; distance: string; nums: number; isFast: boolean }[] = [
  { name: '超级充电站 北京经海产业园', remark: '250KW max · ¥2.29/kWh', distance: '2 km', nums: 7, isFast: true },
  { name: '超级充电站 北京亦庄嘉德长实科技', remark: '120KW max · ¥2.50/kWh', distance: '1 km', nums: 2, isFast: false },
  { name: '超级充电站 北京亦城国际中心', remark: '120KW max · ¥2.29/kWh', distance: '5 km', nums: 5, isFast: false },
  { name: '超级充电站 北京亦城国际中心', remark: '250KW max · ¥2.29/kWh', distance: '3 km', nums: 6, isFast: true },
  { name: '超级充电站 龙湖北京亦庄天街', remark: '250KW max · ¥2.25/kWh', distance: '4 km', nums: 3, isFast: true },
  { name: '超级充电站 北京住总万科广场', remark: '250KW max · ¥2.29/kWh', distance: '2 km', nums: 5, isFast: true },
  { name: '超级充电站 北京高力家居港', remark: '120KW max · ¥2.40/kWh', distance: '7 km', nums: 5, isFast: false },
  { name: '超级充电站 北京市永新铂勒', remark: '250KW max · ¥2.29/kWh', distance: '8 km', nums: 6, isFast: true },
];

export const recentListEn: { days: string; id: number; children: { name: string; remark: string; distance: string }[] }[] = [
  {
    days: 'Today',
    id: 1,
    children: [
      { name: 'Bowl Thai', remark: '15390 S Weatern Ave, Gardena, CA 90249', distance: '4 mi' },
      { name: '2917 Lomita Blvd', remark: '2917 LomitaBlvd, Torrance', distance: '6 mi' },
      { name: 'Petco', remark: '3901 Inglewood Ave, Redondo Beach', distance: '6 mi' },
    ],
  },
  {
    days: 'Yesterday',
    id: 3,
    children: [
      { name: 'Starbucks', remark: '15490 S weatern Ave, Gardena, CA 90249', distance: '2 mi' },
      { name: 'Starbucks', remark: '15490 S weatern Ave, Gardena, CA 90249', distance: '3 mi' },
      { name: 'Starbucks', remark: '15490 S weatern Ave, Gardena, CA 90249', distance: '4 mi' },
    ],
  },
];
export const chargeListEn: { name: string; remark: string; distance: string; nums: number; isFast: boolean }[] = [
  { name: 'Supercharger CA - West 120th Street', remark: '72kW max · $0.38/kWh', distance: '6 mi', nums: 7, isFast: true },
  { name: 'Supercharger CA - West 120th Street', remark: '72kW max · $0.38/kWh', distance: '6 mi', nums: 2, isFast: false },
  { name: 'Supercharger CA - West 120th Street', remark: '72kW max · $0.38/kWh', distance: '6 mi', nums: 5, isFast: false },
  { name: 'Supercharger CA - West 120th Street', remark: '72kW max · $0.38/kWh', distance: '6 mi', nums: 6, isFast: true },
  { name: 'Supercharger CA - West 120th Street', remark: '72kW max · $0.38/kWh', distance: '6 mi', nums: 3, isFast: true },
  { name: 'Supercharger CA - West 120th Street', remark: '72kW max · $0.38/kWh', distance: '6 mi', nums: 5, isFast: true },
  { name: 'Supercharger CA - West 120th Street', remark: '72kW max · $0.38/kWh', distance: '6 mi', nums: 5, isFast: false },
  { name: 'Supercharger CA - West 120th Street', remark: '72kW max · $0.38/kWh', distance: '6 mi', nums: 6, isFast: true },
];
