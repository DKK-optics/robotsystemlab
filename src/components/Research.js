import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faRobot, faMicrochip } from '@fortawesome/free-solid-svg-icons';

// --- Styled Components ---
const ResearchSection = styled.section`
  padding: 100px 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
`;

const TabContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const TabButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ active }) => (active ? 'var(--primary-color)' : 'var(--text-color-muted)')};
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 20px;
  padding-bottom: 10px;
  border-bottom: 3px solid ${({ active }) => (active ? 'var(--primary-color)' : 'transparent')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary-color);
  }
`;

// Card-related styled components
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const Card = styled(motion.div)`
  background: #333;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const CardText = styled.p`
  color: var(--text-color-muted);
  line-height: 1.7;
`;


// Table-related styled components
const TableWrapper = styled.div`
  overflow-x: auto;
`;

const PubsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  th, td { padding: 15px 20px; border-bottom: 1px solid var(--background-dark2); }
  th { color: var(--text-color-muted); font-weight: 600; text-transform: uppercase; }
  td { color: var(--text-color); }
  tbody tr:hover { background-color: var(--background-dark2); }
`;

const ShowMoreButton = styled.button`
  background: var(--background-dark2);
  border: 1px solid var(--text-color-muted);
  color: var(--text-color);
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
  transition: all 0.3s ease;
  &:hover {
    background: var(--primary-color);
    color: var(--background-dark1);
    border-color: var(--primary-color);
  }
`;


// --- Animation Variants ---
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // 자식 요소들이 0.2초 간격으로 애니메이션 시작
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const tabItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// --- Data ---
const researchData = [
    { icon: faCube, title: 'Finite Element Method', text: 'Ansys를 활용한 정밀 유한요소해석(FEM)을 통해 복잡한 공학 문제의 구조적, 열적 거동을 분석하고 예측합니다.' },
    { icon: faRobot, title: 'Robotics', text: '차세대 로봇 플랫폼을 설계하고, 인간과 상호작용하는 로봇을 위한 제어 알고리즘을 연구합니다.' },
    { icon: faMicrochip, title: 'Nanotechnology', text: '나노 스케일에서의 재료 특성을 연구하고, 이를 응용한 초소형 정밀 부품 및 센서 기술을 개발합니다.' }
];

const publicationsData = [
    { title: "Mechanically induced flexible two-dimensional PdSe2 sensors based on piezotronic effect", authors: 8, journal: "JOURNAL OF ALLOYS AND COMPOUNDS", volume: "1017, 179014", publisher: "ELSEVIER SCIENCE SA", date: "2025.02.25." },
    { title: "Temperature dependence electron conduction in horizontally aligned trapezoidal‑shaped AlGaN/ GaN nanowire wrap‑gate transistor", authors: 8, journal: "JOURNAL OF MATERIALS SCIENCE-MATERIALS IN ELECTRONICS", volume: "35, 1813", publisher: "SPRINGER", date: "2024.09.27." },
    { title: "Strain-Modulated Flexible Bio-Organic/Graphene/PET Sensors Based on DNA-Curcumin Biopolymer", authors: 4, journal: "Biomolecules", volume: "14(6), 698", publisher: "MDPI", date: "2024.06.14." },
    { title: "Barrier Height, Ideality Factor and Role of Inhomogeneities at the AlGaN/GaN Interface in GaN Nanowire Wrap-Gate Transistor", authors: 7, journal: "NANOMATERIALS", volume: "13(24), 3159", publisher: "MDPI AG", date: "2023.12.17." },
    { title: "Effect of yttrium doping on the crystal structure, optical, and photocatalytic properties of hydrothermally synthesized ZnO nanorods", authors: 9, journal: "MATERIALS SCIENCE AND ENGINEERING B-ADVANCED FUNCTIONAL SOLID-STATE MATERIALS", volume: "296, 116664", publisher: "ELSEVIER SCIENCE BV", date: "2023.10.01." },
    { title: "A review on hydrogels classification and recent developments in biomedical applications", authors: 7, journal: "INTERNATIONAL JOURNAL OF POLYMERIC MATERIALS AND POLYMERIC BIOMATERIALS", volume: "72(13)", publisher: "TAYLOR & FRANCIS AS", date: "2023.09.02." },
    { title: "Hydrogen evolution properties of Cr doped and (Cr, Er) co-doped ZnS nanoparticles", authors: 8, journal: "JOURNAL OF MATERIALS SCIENCE-MATERIALS IN ELECTRONICS", volume: "34(22)", publisher: "SPRINGER", date: "2023.08.02." },
    { title: "Carrier Trap and Their Effects on the Surface and Core of AlGaN/GaN Nanowire Wrap-Gate Transistor", authors: 7, journal: "NANOMATERIALS", volume: "13(14), 2132", publisher: "MDPI AG", date: "2023.07.22." },
    { title: "Improved interfacial mechanical strength and synergy in properties of nano-carbon black reinforced rubber composites containing functionalized graphite nanoplatelets", authors: 7, journal: "SURFACES AND INTERFACES", volume: "39, 102941", publisher: "ELSEVIER", date: "2023.07.01." },
    { title: "Synthesis of diluted magnetic semiconductor ZnS:Cr and ZnS:(Cr+V) nanoparticles for spintronic applications", authors: 9, journal: "MATERIALS SCIENCE IN SEMICONDUCTOR PROCESSING", volume: "161, 107479", publisher: "ELSEVIER SCI LTD", date: "2023.07.01." },
    { title: "Developing the Ferromagnetic Feature of ZnS:Cr Nanoparticles by Er Co‑doping", authors: 9, journal: "JOURNAL OF SUPERCONDUCTIVITY AND NOVEL MAGNETISM", volume: "36(6)", publisher: "SPRINGER", date: "2023.06.27." },
    { title: "Hydrogen evolution properties: Cr doping and V co-doping effect of ZnS nanoparticles", authors: 8, journal: "MATERIALS LETTERS", volume: "340, 134186", publisher: "ELSEVIER SCIENCE BV", date: "2023.06.01." },
    { title: "Dopant-induced red emission, paramagnetism, and hydrogen evolution of diluted magnetic semiconductor ZnS : Eu nanoparticles", authors: 8, journal: "KOREAN JOURNAL OF CHEMICAL ENGINEERING", volume: "40(4)", publisher: "KOREAN INSTITUTE CHEMICAL ENGINEERS", date: "2023.04.01." },
    { title: "Estimation of Convection‑Related Parameters Over Vijayawada Station, India", authors: 7, journal: "THALASSAS", volume: "39(1)", publisher: "SPRINGER INTERNATIONAL PUBLISHING AG", date: "2023.04.01." },
    { title: "Ultra-flexible graphene/nylon/PDMS coaxial fiber-shaped multifunctional sensor", authors: 10, journal: "NANO RESEARCH", volume: "16 (4), 5541", publisher: "TSINGHUA UNIV PRESS", date: "2023.04.01." },
    { title: "Fabrication of InVO4/SnWO4 heterostructured photocatalyst for efficient photocatalytic degradation of tetracycline under visible light", authors: 6, journal: "ENVIRONMENTAL RESEARCH", volume: "220, 115191", publisher: "ACADEMIC PRESS INC ELSEVIER SCIENCE", date: "2023.03.01." },
    { title: "Improved hydrogen evolution and interesting luminescence properties of rare Earth ion‑doped ZnS nanoparticles", authors: 9, journal: "APPLIED PHYSICS A-MATERIALS SCIENCE & PROCESSING", volume: "129(2), 106", publisher: "SPRINGER", date: "2023.02.01." },
    { title: "Vanadium‑doped ZnO nanorods: magnetic and enhanced H2 properties", authors: 9, journal: "APPLIED PHYSICS A-MATERIALS SCIENCE & PROCESSING", volume: "128(12), 1084", publisher: "SPRINGER", date: "2022.12.01." },
    { title: "Strain-engineered piezotronic effects in flexible monolayer MoS2 continuous thin films", authors: 8, journal: "NANO ENERGY", volume: "103, Part B, 107863", publisher: "ELSEVIER SCIENCE BV", date: "2022.12.01." },
    { title: "Novel Indium Vanadium Oxide Nanosheet-Supported Nickel Iron Oxide Nanoplate Heterostructure for Synergistically Enhanced Photocatalytic Degradation of Tetracycline", authors: 5, journal: "CATALYSTS", volume: "12(11), 1471", publisher: "MDPI AG", date: "2022.11.18." },
    { title: "Visible-light-driven indium vanadium oxide nanosheets supported bismuth tungsten oxide nanoflakes heterostructure as an efficient photocatalyst for the tetracycline degradation", authors: 5, journal: "CHEMOSPHERE", volume: "299, 134477", publisher: "PERGAMON-ELSEVIER SCIENCE LTD", date: "2022.07.01." },
    { title: "Facile fabrication of novel ceria-based nanocomposite (CYO-CSO) via co-precipitation: Electrochemical, photocatalytic and antibacterial performances", authors: 9, journal: "JOURNAL OF MOLECULAR STRUCTURE", volume: "1256, 132519", publisher: "ELSEVIER SCIENCE BV", date: "2022.05.15." },
    { title: "Convection‑based assessment of pre‑monsoon season instability indices over Chandigarh and Ladakh regions, India", authors: 7, journal: "ARABIAN JOURNAL OF GEOSCIENCES", volume: "15(7), 571", publisher: "SPRINGER HEIDELBERG", date: "2022.04.01." },
    { title: "Study of Pre‑monsoon CAPE Development over Puducherry, India", authors: 6, journal: "THALASSAS", volume: "38(1)", publisher: "SPRINGER INTERNATIONAL PUBLISHING AG", date: "2022.04.01." },
    { title: "Variation of Thermodynamic Indices Over Four Stations of Bangladesh", authors: 7, journal: "THALASSAS", volume: "38(1)", publisher: "SPRINGER INTERNATIONAL PUBLISHING AG", date: "2022.04.01." },
    { title: "Bio-Stimulated Adsorption of Cr(VI) from Aqueous Solution by Groundnut Shell Activated Carbon@Al Embedded Material", authors: 5, journal: "CATALYSTS", volume: "12(3), 290", publisher: "MDPI AG", date: "2022.03.03." },
    { title: "Novel Z-scheme Binary Zinc Tungsten Oxide/Nickel Ferrite Nanohybrids for Photocatalytic Reduction of Chromium (Cr (VI)), Photoelectrochemical Water Splitting and Degradation of Toxic Organic Pollutants", authors: 8, journal: "JOURNAL OF HAZARDOUS MATERIALS", volume: "423(Part A), 127044", publisher: "ELSEVIER SCIENCE BV", date: "2022.02.05." },
    { title: "An effective CuO/Bi2WO6 heterostructured photocatalyst: Analyzing a charge-transfer mechanism for the enhanced visible-light-driven photocatalytic degradation of tetracycline and organic pollutants", authors: 7, journal: "CHEMOSPHERE", volume: "287(Part 2), 132015", publisher: "PERGAMON-ELSEVIER SCIENCE LTD", date: "2022.01.01." },
    { title: "Recent Trends in Graphitic Carbon Nitride-Based Binary and Ternary Heterostructured Electrodes for Photoelectrochemical Water Splitting", authors: 7, journal: "PROCESSES", volume: "9(11), 1959", publisher: "MDPI AG", date: "2021.11.02." },
    { title: "Study of statistical estimated parameters using ERA5 reanalysis data over Khulna region during monsoon season", authors: 7, journal: "ACTA GEOPHYSICA", volume: "69(5)", publisher: "SPRINGER INTERNATIONAL PUBLISHING AG", date: "2021.10.01." },
    { title: "Synthesis of 2D NiFe2O4 nanoplates/2D Bi2WO6 nanoflakes heterostructure: An enhanced Z-scheme charge transfer and separation for visible-light-driven photocatalytic degradation of toxic pollutants", authors: 6, journal: "Journal of Environmental Chemical Engineering", volume: "9(5), 105893", publisher: "ELSEVIER SCI LTD", date: "2021.10.01." },
    { title: "Hierarchical two-dimensional layered double hydroxide coated polydopamine nanocarriers for combined chemodynamic and photothermal tumor therapy", authors: 5, journal: "Coatings", volume: "11(8), 1008", publisher: "MDPI AG", date: "2021.08.23." },
    { title: "Energy Saving and Economic Evaluations of Exhaust Waste Heat Recovery Hot Water Supply System for Resort", authors: 4, journal: "SYMMETRY-BASEL", volume: "13(4), 624", publisher: "MDPI AG", date: "2021.04.08." },
    { title: "Experimental Study on Heating Performances of Integrated Battery and HVAC System with Serial and Parallel Circuits for Electric Vehicle", authors: 5, journal: "SYMMETRY-BASEL", volume: "13(1), 93", publisher: "MDPI AG", date: "2021.01.07." },
    { title: "Angle of Twist of a Double-bent Leaf Flexure under Torsion", authors: 4, journal: "STROJNISKI VESTNIK-JOURNAL OF MECHANICAL ENGINEERING", volume: "64(5)", publisher: "ASSOC MECHANICAL ENGINEERS TECHNICIANS SLOVENIA", date: "2018.05.15." },
    { title: "Electrochemical corrosion behavior and surface modification of ZrB2 in hydrofluoric acid aqueous solution", authors: 6, journal: "INTERNATIONAL JOURNAL OF APPLIED CERAMIC TECHNOLOGY", volume: "14(4)", publisher: "WILEY", date: "2017.08.01." },
    { title: "Warping stresses of a rectangular single leaf flexure under torsion", authors: 3, journal: "Structural Engineering and Mechanics", volume: "59(3)", publisher: "TECHNO-PRESS", date: "2016.08.10." },
    { title: "Graphene Nano-Platelets Reinforced ZrO2 Consolidated by Spark Plasma Sintering", authors: 6, journal: "SCIENCE OF ADVANCED MATERIALS", volume: "8(2)", publisher: "AMER SCIENTIFIC PUBLISHERS", date: "2016.02.01." },
    { title: "Spark Plasma Sintered ZrO2: Effect of Sintering Temperature and the Addition of Graphene Nano-Platelets on Mechanical Properties", authors: 3, journal: "SCIENCE OF ADVANCED MATERIALS", volume: "8(2)", publisher: "AMER SCIENTIFIC PUBLISHERS", date: "2016.02.01." },
    { title: "Compliance Matrix of a Single-Bent Leaf Flexure for a Modal Analysis", authors: 4, journal: "SHOCK AND VIBRATION", volume: "2015", publisher: "HINDAWI PUBLISHING CORPORATION", date: "2015.05.19." },
    { title: "Displacement Analysis of a Single-bent Leaf Flexure under Transverse Load", authors: 3, journal: "International Journal of Precision Engineering and Manufacturing", volume: "16(4)", publisher: "KOREAN SOC PRECISION ENG", date: "2015.04.30." },
    { title: "Torsional Analysis of a Single-bent Leaf Flexure", authors: 3, journal: "Structural Engineering and Mechanics", volume: "54(1)", publisher: "TECHNO-PRESS", date: "2015.04.10." },
    { title: "Two Color Laser Induced Confocal Fluorescent Thermometry: Design and Experiments", authors: 4, journal: "International Journal of Precision Engineering and Manufacturing", volume: "16(3)", publisher: "KOREAN SOC PRECISION ENG", date: "2015.03.01." },
    { title: "Bending analysis of a single leaf flexure using higher-order beam theory", authors: 2, journal: "Structural Engineering and Mechanics", volume: "53(4)", publisher: "TECHNO-PRESS", date: "2015.02.25." },
    { title: "Thermophysical Characteristics of the Ferrofluid in a Vertical Rectangle", authors: 5, journal: "Entropy", volume: "17(2)", publisher: "MDPI Publishing", date: "2015.02.16." },
    { title: "Numerical study of a SiC mould subjected to a spark plasma sintering process", authors: 5, journal: "SCRIPTA MATERIALIA", volume: "96", publisher: "PERGAMON-ELSEVIER SCIENCE LTD", date: "2015.02.01." },
    { title: "New Electro-Magnetic Actuator For Active Vibration Isolators", authors: 6, journal: "International Journal of Precision Engineering and Manufacturing", volume: "16(1)", publisher: "KOREAN SOC PRECISION ENG", date: "2015.01.01." },
    { title: "Transition in micro/nano-scale mechanical properties of ZrO2/multi-wall carbon nanotube composites", authors: 12, journal: "JOURNAL OF THE CERAMIC SOCIETY OF JAPAN", volume: "122(1432)", publisher: "CERAMIC SOC JAPAN-NIPPON SERAMIKKUSU KYOKAI", date: "2014.12.01." },
    { title: "A Double-bent Planar Leaf Flexure Guide for a Nano-scanner: Experimental Report", authors: 4, journal: "Journal of the Korean Physical Society", volume: "65(9)", publisher: "The Korean Physical Society", date: "2014.11.01." },
    { title: "Ferrite multiphase/carbon nanotube composites sintered by microwave and spark plasma sintering", authors: 9, journal: "JOURNAL OF THE CERAMIC SOCIETY OF OF JAPAN", volume: "122(10)", publisher: "CERAMIC SOC JAPAN-NIPPON SERAMIKKUSU KYOKAI", date: "2014.10.01." },
    { title: "Ferrite multiphase/carbon nanotube composites sintered by spark plasma sintering", authors: 14, journal: "JOURNAL OF THE CERAMIC SOCIETY OF JAPAN", volume: "122(9)", publisher: "CERAMIC SOC JAPAN-NIPPON SERAMIKKUSU KYOKAI", date: "2014.09.01." },
    { title: "Review on Conventional Air Conditioning, Alternative Refrigerants, and CO2 Heat Pumps for Vehicles", authors: 2, journal: "Advances in Mechanical Engineering", volume: "2013", publisher: "Hindawi Publishing Corporation", date: "2013.11.14." },
    { title: "C-terminal truncation of a bovine B12 trafficking chaperone enhances the sensitivity of the glutathione-regulated thermostability", authors: 4, journal: "BMB REPORTS (BIOCHEMISTRY & MOLECULAR BIOLOGY)", volume: "46", publisher: "KOREAN SOCIETY FOR BIOCHEMISTRY AND MOLECULAR BIOLOGY", date: "2013.03.31." },
    { title: "Performance characteristics of mobile heat pump for a large passenger electric vehicle", authors: 5, journal: "APPLIED THERMAL ENGINEERING", volume: "Vol.50, No.1", publisher: "PERGAMON-ELSEVIER SCIENCE LTD", date: "2013.01.10." },
    { title: "Nano-scanner for Scanning Probe Microscopes", authors: 2, journal: "Journal of the Korean Physical Society", volume: "Vol.61,No.9", publisher: "The Korean Physical Society", date: "2012.11.30." },
    { title: "Experimental Study on Frost Height of Round Plate Fin-Tube Heat Exchangers for Mobile Heat Pumps", authors: 3, journal: "ENERGIES", volume: "5", publisher: "MDPI AG", date: "2012.09.10." },
    { title: "A compact and fast nano-stylus profiling head for optical instruments", authors: 4, journal: "JOURNAL OF MECHANICAL SCIENCE AND TECHNOLOGY", volume: "Vol.26, No.7", publisher: "KOREAN SOC MECHANICAL ENGINEERS(KSME)", date: "2012.07.01." },
    { title: "Preparation and application of the 3C–SiC substrate to piezoelectric micro cantilever transducers", authors: 6, journal: "APPLIED PHYSICS A-MATERIALS SCIENCE & PROCESSING", volume: "108", publisher: "SPRINGER", date: "2012.07.01." },
    { title: "Rapid detection of dysfunctional high-density lipoproteins using isoelectric", authors: 6, journal: "ELECTROPHORESIS", volume: "32(23)", publisher: "WILEY-V C H VERLAG GMBH", date: "2011.11.27." },
    { title: "Optimal materials and process conditions of functional layers for piezoelectric MEMS process at high temperature", authors: 4, journal: "MICRO & NANO LETTERS", volume: "6(7)", publisher: "INST ENGINEERING TECHNOLOGY-IET, MICHAEL FARADAY HOUSE SIX HILLS WAY STEVENAGE, HERTFORD SG1 2AY, EN", date: "2011.07.29." },
    { title: "A Double-bent Planar Leaf Flexure Guide for a Nano-scanner", authors: 4, journal: "Journal of the Korean Physical Society", volume: "57(61)", publisher: "The Korean Physical Society", date: "2010.12.15." },
    { title: "A Compact Vertical Scanner for Atomic Force Microscopes", authors: 3, journal: "SENSORS", volume: "Vol.10, No.12", publisher: "MOLECULAR DIVERSITY PRESERVATION INTERNATIONAL", date: "2010.12.01." },
    { title: "A nano-metrology system with a two-dimensional combined optical and X-ray interferometer and an atomic force microscope", authors: 3, journal: "MICROSYSTEM TECHNOLOGIES-MICRO-AND NANOSYSTEMS-INFORMATION STORAGE AND PROCESSING SYSTEMS", volume: "15", publisher: "SPRINGER, 233 SPRING ST, NEW YORK, USA, NY, 10013", date: "2009.10.25." },
    { title: "Accurate Measurement of the Out-of-plane Motion of a Tip-scanning Atomic Force Microscope", authors: 2, journal: "INTERNATIONAL JOURNAL OF PRECISION ENGINEERING AND MANUFACTURING", volume: "10", publisher: "KOREAN SOCIETY FOR PRECISION ENGINEERING(한국정밀공학회)", date: "2009.01.01." },
    { title: "Performance characteristics of a small-capacity directly cooled refrigerator using R290/R600a (55/45)", authors: 3, journal: "INTERNATIONAL JOURNAL OF REFRIGERATION-REVUE INTERNATIONALE DU FROID", volume: "31(4)", publisher: "ELSEVIER SCI LTD", date: "2008.06.02." },
    { title: "A new nano-accuracy AFM system for minimizing Abbe errors and the evaluation of its measuring uncertainty", authors: 3, journal: "ULTRAMICROSCOPY", volume: "107(4-5)", publisher: "ELSEVIER SCIENCE BV", date: "2007.04.01." },
    { title: "A Calibrated Atomic Force Microscope using an Orthogonal Scanner and a Calibrated Laser Interferometer", authors: 4, journal: "APPLIED SURFACE SCIENCE", volume: "253(8)", publisher: "ELSEVIER SCIENCE BV", date: "2007.02.15." },
    { title: "Design and Evaluation of Two Dimensional Metrological Atomic Force Microscope using a Planar Nanoscanner", authors: 3, journal: "JAPANESE JOURNAL OF APPLIED PHYSICS PART 1-REGULAR PAPERS SHORT NOTES & REVIEW PAPERS", volume: "45(3B)", publisher: "INST PURE APPLIED PHYSICS", date: "2006.03.27." },
    { title: "Orthogonality Correction of Planar Sample Scanner for Atomic Force Microscope", authors: 3, journal: "JAPANESE JOURNAL OF APPLIED PHYSICS PART 1-REGULAR PAPERS SHORT NOTES & REVIEW PAPERS", volume: "45(13)", publisher: "INST PURE APPLIED PHYSICS", date: "2006.03.24." },
    { title: "Pseudo-Resonant Effect on a Flexure-Guided Nano-Positioning System", authors: 2, journal: "Journal of the Korean Physical Society", volume: "48(3)", publisher: "한국물리학회", date: "2006.03.15." },
    { title: "A High-speed Miniature Screening Gaschromatograph with Flame Ionization Detector", authors: 3, journal: "Journal of Mechanical Science and Technology", volume: "19(12)", publisher: "대한기계학회", date: "2005.12.01." },
    { title: "Atomic force microscope with improved scan accuracy, scan speed and optical vision", authors: 7, journal: "REVIEW OF SCIENTIFIC INSTRUMENTS", volume: "74(10)", publisher: "AMER INST PHYSICS", date: "2003.10.01." }
];

const ipData = [
    { title: "비틀림 시험기", inventors: 5, appNo: "10-2014-0064793", regNo: "10-1679472", date: "2016.11.18." },
    { title: "변위 증폭기", inventors: 1, appNo: "10-2012-0156109", regNo: "10-1306993", date: "2013.09.03." },
    { title: "주사탐침현미경용 스캐너", inventors: 3, appNo: "10-2009-0081561", regNo: "10-1151136", date: "2012.05.22." },
    { title: "스테이지장치", inventors: 3, appNo: "10-2009-0081561", regNo: "10-1103174", date: "2011.12.29." },
    { title: "원자간력 현미경용 Z축 스캐너", inventors: 3, appNo: "10-2009-0081563", regNo: "10-1038360", date: "2011.05.25." },
    { title: "원통형 자기부상 스테이지", inventors: 8, appNo: "10-2008-0065102", regNo: "10-0977466-00-00", date: "2010.08.17." },
    { title: "유도성 결합 플라즈마의 내장형 ＲＦ 안테나 및 이를장착한 플라즈마 챔버", inventors: 6, appNo: "10-2007-0117818", regNo: "10-0931846-00-00", date: "2009.12.07." },
    { title: "원통금형 기판의 고분해능 이송과 능동 자세 제어가 가능한 나노 노광기 및 노광 방법", inventors: 5, appNo: "2007-0117535", regNo: "10-0929883-00-00", date: "2009.11.26." },
    { title: "원통형 기판용 스핀 코터 및 이를 이용한 코팅방법", inventors: 6, appNo: "10-2007-0117809", regNo: "10-0924656-00-00", date: "2009.10.27." }
];


// --- Component ---
function Research() {
  const [activeTab, setActiveTab] = useState('fields');
  const [showAllPubs, setShowAllPubs] = useState(false);
  const [showAllIps, setShowAllIps] = useState(false);

  const visiblePubs = showAllPubs ? publicationsData : publicationsData.slice(0, 5);
  const visibleIps = showAllIps ? ipData : ipData.slice(0, 5);

  return (
    <ResearchSection id="research">
      <div className="container">
        <SectionTitle
          as={motion.h2}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          RESEARCH
        </SectionTitle>
        <TabContainer
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <TabButton
            active={activeTab === 'fields'}
            onClick={() => setActiveTab('fields')}
            variants={tabItemVariants}
          >
            Research Fields
          </TabButton>
          <TabButton
            active={activeTab === 'publications'}
            onClick={() => setActiveTab('publications')}
            variants={tabItemVariants}
          >
            Publications
          </TabButton>
          <TabButton
            active={activeTab === 'ip'}
            onClick={() => setActiveTab('ip')}
            variants={tabItemVariants}
          >
            IP & Tech Transfer
          </TabButton>
        </TabContainer>

        {activeTab === 'fields' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <CardsContainer>
              {researchData.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card>
                    <IconWrapper><FontAwesomeIcon icon={item.icon} /></IconWrapper>
                    <CardTitle>{item.title}</CardTitle>
                    <CardText>{item.text}</CardText>
                  </Card>
                </motion.div>
              ))}
            </CardsContainer>
          </motion.div>
        )}

        {activeTab === 'publications' && (
          <TableWrapper>
            <PubsTable>
              <thead><tr><th>Title</th><th>Co-authors</th><th>Journal</th><th>Volume</th><th>Publisher</th><th>Date</th></tr></thead>
              <tbody>
                {visiblePubs.map((pub, index) => (
                  <tr key={index}><td>{pub.title}</td><td>{pub.authors}</td><td>{pub.journal}</td><td>{pub.volume}</td><td>{pub.publisher}</td><td>{pub.date}</td></tr>
                ))}
              </tbody>
            </PubsTable>
            {!showAllPubs && publicationsData.length > 5 && (
              <ShowMoreButton onClick={() => setShowAllPubs(true)}>Show More</ShowMoreButton>
            )}
          </TableWrapper>
        )}

        {activeTab === 'ip' && (
          <TableWrapper>
            <PubsTable>
              <thead><tr><th>Title</th><th>Inventors</th><th>Application No.</th><th>Registration No.</th><th>Date</th></tr></thead>
              <tbody>
                {visibleIps.map((ip, index) => (
                  <tr key={index}><td>{ip.title}</td><td>{ip.inventors}</td><td>{ip.appNo}</td><td>{ip.regNo}</td><td>{ip.date}</td></tr>
                ))}
              </tbody>
            </PubsTable>
            {!showAllIps && ipData.length > 5 && (
              <ShowMoreButton onClick={() => setShowAllIps(true)}>Show More</ShowMoreButton>
            )}
          </TableWrapper>
        )}
      </div>
    </ResearchSection>
  );
}

export default Research; 