// To use the MindMap below, run: npm install reactflow
"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

const nodeDetails = {
  main: {
    title: "Non-energy appliance of nuclear technology",
    description:
      "The central hub exploring nuclear technology applications beyond energy generation, focusing on various practical uses in different fields.",
  },
  basicKnowledge: {
    title: "Basic Knowledge of Nuclear",
    description:
      "Fundamental understanding of nuclear science including definitions, reactions, isotopes, and production methods.",
  },
  overviewNuclearMedicine: {
    title: "Overview of Nuclear Medicine",
    description:
      "Nuclear medicine is a medical field using radioactive isotopes, like Technetium-99m (Tc-99m), for diagnosing and treating diseases. It involves injecting small amounts of radioactive materials, detected via imaging to assess organ function and detect issues early, unlike X-rays which focus on anatomy. Produced in nuclear reactors, it aids in detecting cancer, heart disease, and thyroid disorders, offering targeted therapy. Economically, it improves outcomes and cuts long-term costs, though it needs significant infrastructure investment.",
  },
  nuclearAgriculture: {
    title: "Nuclear Applications in Agriculture",
    description:
      "Nuclear applications in agriculture utilize radioactive isotopes and radiation techniques to enhance crop production, improve resource utilization, and ensure food safety. These methods, developed through nuclear technology, help address challenges like food security and sustainable farming by leveraging radiation to modify plants and trace nutrient uptake.",
  },
  industrialRadiography: {
    title: "Industrial Radiography",
    description:
      "A key Non-Destructive Testing (NDT) method, used in managing structural integrity and detection. It ensures safety and reliability by inspecting materials without causing damage.",
  },
  gauging: {
    title: "Gauging in Nuclear Technology",
    description:
      "Uses radioactive isotopes (often gamma emitters like Cobalt-60 or Caesium-137) to measure thickness, density, level, or composition of materials.",
  },
  nuclearResearch: {
    title: "Nuclear Research",
    description:
      "Using radioactive isotopes and nuclear techniques to advance scientific knowledge in fields like archaeology, geology, and environmental sciences. These isotopes, produced in reactors or accelerators, act as tracers to study natural processes and historical events, offering long-term societal benefits as a key non-energy application.",
  },
  // Basic Knowledge sub-nodes
  definition: {
    title: "Definition",
    description:
      "Nuclear technology involves the use of atomic nuclei to generate energy or other applications. It relies on processes such as fission (splitting atoms) and fusion (combining atoms), depending on the intended use. This serves as the basis for understanding that nuclear technology is not limited to electricity generation but encompasses various fields.",
  },
  typesOfReactions: {
    title: "Types of Reactions",
    description:
      "Overview of nuclear fission and fusion reactions and their applications.",
  },
  fission: {
    title: "Fission",
    description:
      "This process occurs when a heavy atom (such as uranium-235) splits into smaller particles, releasing energy. It is the primary mechanism in nuclear power plants.",
  },
  fusion: {
    title: "Fusion",
    description:
      "This process happens when two light atoms (such as hydrogen) combine to form a heavier atom, releasing significant energy (used in the sun and being researched for future energy). Both reactions involve the nucleus, but fission is currently more prevalent in practice.",
  },
  isotopes: {
    title: "Isotopes",
    description:
      "Isotopes are variants of a chemical element with the same number of protons but different numbers of neutrons, resulting in different masses (e.g., Carbon-12 and Carbon-14). In nuclear technology, isotopes (such as I-131 and Co-60) are produced in reactors and play a crucial role in fields like medicine and industry, beyond just electricity generation.",
  },
  production: {
    title: "Production",
    description:
      "Isotopes are generated in nuclear reactors or particle accelerators. This process occurs when neutrons collide with atoms, creating new isotopes. This highlights the potential of nuclear technology to extend beyond electricity, particularly in isotope production.",
  },
  // Nuclear Medicine sub-nodes
  diagnosticApplications: {
    title: "Diagnostic Applications",
    description:
      "Nuclear diagnostic applications in medical imaging and disease detection using radioactive tracers and imaging techniques.",
  },
  therapeuticApplications: {
    title: "Therapeutic Applications",
    description:
      "Nuclear therapeutic applications using radioactive isotopes for cancer treatment and other medical therapies.",
  },
  fluorine18: {
    title: "Fluorine-18 (F-18)",
    description:
      "Fluorine-18 (F-18) is a widely used radioactive isotope in nuclear reactions, particularly for positron emission tomography (PET) imaging. It emits positrons with a half-life of approximately 110 minutes, enabling effective imaging of metabolic processes while minimizing radiation exposure to patients. It is commonly incorporated into fluorodeoxyglucose (FDG) for detecting cancer, assessing brain metabolism in conditions like Alzheimer's, and measuring myocardial perfusion in cardiology. The use of F-18 reduces healthcare costs through early diagnosis and personalized treatment planning, but its production requires cyclotrons and complex synthesis processes, leading to high initial costs and logistical challenges due to its short half-life, necessitating proximity to production facilities.",
  },
  technetium99m: {
    title: "Technetium-99m (Tc-99m)",
    description:
      "Technetium-99m (Tc-99m) is a radioactive isotope widely used in nuclear medicine for diagnostic imaging. The use of Tc-99m cuts costs through early diagnosis, but its production requires modern reactors and safety management, leading to high initial costs and dependence on a stable supply.",
  },
  iodine131Cobalt60: {
    title: "Iodine-131 (I-131) and Cobalt-60 (Co-60)",
    description:
      "This technique involves using radioactive isotopes, such as Iodine-131 (I-131) or Cobalt-60 (Co-60), to target and damage malignant cells while minimizing harm to surrounding healthy tissues, playing a key role in cancer therapy. I-131 is used to treat thyroid cancer and hyperthyroidism, while Co-60 is employed in external beam radiation therapy for various cancers, including breast and prostate cancer. This method enhances long-term treatment costs by improving cure rates and reducing the need for surgery, but it requires expensive radiation equipment and skilled personnel, pending high initial costs and challenges in maintaining safety and disposal protocols.",
  },
  iridium192: {
    title: "Iridium-192 (Ir-192)",
    description:
      "Iridium-192 (Ir-192) is a radioactive isotope widely used in nuclear medicine, particularly for brachytherapy. It emits gamma rays with a half-life of about 74 days, allowing controlled delivery of radiation to target tissues, especially cancer cells, while minimizing exposure to healthy tissue. Ir-192 is commonly used in high-dose-rate (HDR) brachytherapy to treat cancers such as prostate and breast cancer. This technique reduces long-term healthcare costs by improving treatment success and reducing hospital stays, but its production and use require specialized equipment and trained staff, leading to high initial costs and challenges in safe handling and waste management.",
  },
  // Agriculture sub-nodes
  carbon14: {
    title: "Carbon-14 (C-14)",
    description:
      "A radioactive isotope widely utilized in agriculture, particularly for crop improvement and research.",
  },
  // Industrial Radiography sub-nodes
  specificApplications: {
    title: "Specific Applications",
    description:
      "Sterilizing medical equipment, Inspecting metal parts and welds. Increases safety and precision in quality control; cost-effective mass sterilization. High handling and disposal costs; strict regulatory controls.",
  },
  iridium192Industrial: {
    title: "Iridium-192 (Ir-192) - Industrial",
    description:
      "A gamma-emitting isotope used primarily in non-destructive testing. Radioactive isotope with a half-life of 74 days. Industrial radiography (especially weld inspection in pipelines and structures), Brachytherapy (internal radiotherapy). Portable and efficient for field inspections; improves structural safety. Short half-life (74 days) requires frequent replenishment; high security risk.",
  },
  nepalEarthquake: {
    title: "Nepal Earthquake 2015",
    description:
      "After the 2015 Nepal Earthquake, Non-Destructive Testing (NDT) using radioactive isotopes (like gamma radiography) was used to assess the safety of damaged buildings. This showed the vital role of industrial radiography in post-disaster inspections, leading to global efforts to expand NDT use in disaster response.",
  },
  // Gauging sub-nodes
  caesium137: {
    title: "Caesium-137",
    description:
      "A radioisotope with a 30.17-year half-life, commonly produced in nuclear reactors. It is widely used in gauging applications due to its gamma radiation, offering non-contact, non-destructive measurements in industrial processes. Measuring thickness of materials like paper, rubber, and metal sheets, Level gauges in tanks and silos. Enables continuous, non-contact measurements; enhances manufacturing efficiency. Radioactive waste concerns; risk of contamination if improperly handled.",
  },
  americium241: {
    title: "Americium-241",
    description:
      "A long-lived radioisotope (half-life: 432 years) widely used in gauging and specialized industrial applications due to its alpha and gamma emissions. Material density gauges in construction and mining, Smoke detectors. Highly sensitive detection; durable source. Long half-life complicates disposal; regulatory restrictions on use.",
  },
  // Research sub-nodes
  researchApplications: {
    title: "Research Applications",
    description:
      "Biological Studies, Environmental Testing, Non-Radiative Nature, Dataability for Long-Term Analysis, Direct Laboratory Utilization, Water and Soil Management",
  },
  researchIsotopes: {
    title: "Isotopes Used in Research",
    description:
      "Carbon-14 (C-14), Hydrogen-3 (Tritium) (H-3), Chlorine-36 (Cl-36), Lead-210 (Pb-210)",
  },
};

const nodes = [
  // Main node
  {
    id: "main",
    type: "input",
    data: { label: "Non-energy appliance of nuclear technology" },
    position: { x: 0, y: 400 },
    style: {
      background: "linear-gradient(135deg, #1e293b 60%, #6366f1 100%)",
      color: "#fff",
      border: "2px solid #6366f1",
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 16,
      minWidth: 200,
      textAlign: "center",
      boxShadow: "0 4px 24px 0 rgba(59,130,246,0.25)",
    },
  },
  // Second level nodes
  {
    id: "basicKnowledge",
    data: { label: "Basic Knowledge of Nuclear" },
    position: { x: 500, y: 100 },
    style: {
      background: "linear-gradient(135deg, #1e293b 60%, #8b5cf6 100%)",
      color: "#fff",
      border: "2px solid #8b5cf6",
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 16,
      minWidth: 180,
      textAlign: "center",
      boxShadow: "0 4px 24px 0 rgba(139,92,246,0.25)",
    },
  },
  {
    id: "overviewNuclearMedicine",
    data: { label: "Overview of Nuclear Medicine" },
    position: { x: 500, y: 250 },
    style: {
      background: "linear-gradient(135deg, #1e293b 60%, #10b981 100%)",
      color: "#fff",
      border: "2px solid #10b981",
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 16,
      minWidth: 180,
      textAlign: "center",
      boxShadow: "0 4px 24px 0 rgba(16,185,129,0.25)",
    },
  },
  {
    id: "nuclearAgriculture",
    data: { label: "Nuclear Applications in Agriculture" },
    position: { x: 500, y: 400 },
    style: {
      background: "linear-gradient(135deg, #1e293b 60%, #f59e0b 100%)",
      color: "#fff",
      border: "2px solid #f59e0b",
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 16,
      minWidth: 180,
      textAlign: "center",
      boxShadow: "0 4px 24px 0 rgba(245,158,11,0.25)",
    },
  },
  {
    id: "industrialRadiography",
    data: { label: "Industrial Radiography" },
    position: { x: 500, y: 550 },
    style: {
      background: "linear-gradient(135deg, #1e293b 60%, #ef4444 100%)",
      color: "#fff",
      border: "2px solid #ef4444",
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 16,
      minWidth: 180,
      textAlign: "center",
      boxShadow: "0 4px 24px 0 rgba(239,68,68,0.25)",
    },
  },
  {
    id: "gauging",
    data: { label: "Gauging in Nuclear Technology" },
    position: { x: 500, y: 700 },
    style: {
      background: "linear-gradient(135deg, #1e293b 60%, #06b6d4 100%)",
      color: "#fff",
      border: "2px solid #06b6d4",
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 16,
      minWidth: 180,
      textAlign: "center",
      boxShadow: "0 4px 24px 0 rgba(6,182,212,0.25)",
    },
  },
  {
    id: "nuclearResearch",
    data: { label: "Nuclear Research" },
    position: { x: 500, y: 850 },
    style: {
      background: "linear-gradient(135deg, #1e293b 60%, #ec4899 100%)",
      color: "#fff",
      border: "2px solid #ec4899",
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 16,
      minWidth: 180,
      textAlign: "center",
      boxShadow: "0 4px 24px 0 rgba(236,72,153,0.25)",
    },
  },
  // Third level nodes - Basic Knowledge
  {
    id: "definition",
    data: { label: "Definition" },
    position: { x: 1000, y: 50 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #8b5cf6",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 14,
      minWidth: 100,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(139,92,246,0.18)",
    },
  },
  {
    id: "typesOfReactions",
    data: { label: "Types of Reactions" },
    position: { x: 1000, y: 120 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #8b5cf6",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 14,
      minWidth: 120,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(139,92,246,0.18)",
    },
  },
  {
    id: "isotopes",
    data: { label: "Isotopes" },
    position: { x: 1000, y: 190 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #8b5cf6",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 14,
      minWidth: 80,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(139,92,246,0.18)",
    },
  },
  // Third level nodes - Nuclear Medicine
  {
    id: "diagnosticApplications",
    data: { label: "Diagnostic Applications" },
    position: { x: 1000, y: 300 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #10b981",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 14,
      minWidth: 140,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(16,185,129,0.18)",
    },
  },
  {
    id: "therapeuticApplications",
    data: { label: "Therapeutic Applications" },
    position: { x: 1000, y: 370 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #10b981",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 14,
      minWidth: 140,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(16,185,129,0.18)",
    },
  },
  // Third level nodes - Agriculture
  {
    id: "carbon14",
    data: { label: "Carbon-14 (C-14)" },
    position: { x: 1000, y: 450 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #f59e0b",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 14,
      minWidth: 120,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(245,158,11,0.18)",
    },
  },
  // Third level nodes - Industrial Radiography
  {
    id: "specificApplications",
    data: { label: "Specific Applications" },
    position: { x: 1000, y: 600 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #ef4444",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 14,
      minWidth: 140,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(239,68,68,0.18)",
    },
  },
  {
    id: "iridium192Industrial",
    data: { label: "Iridium-192 (Ir-192) - Industrial" },
    position: { x: 1000, y: 670 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #ef4444",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 14,
      minWidth: 160,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(239,68,68,0.18)",
    },
  },
  {
    id: "nepalEarthquake",
    data: { label: "Nepal Earthquake 2015" },
    position: { x: 1000, y: 740 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #ef4444",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 14,
      minWidth: 140,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(239,68,68,0.18)",
    },
  },
  // Third level nodes - Gauging
  {
    id: "caesium137",
    data: { label: "Caesium-137" },
    position: { x: 1000, y: 850 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #06b6d4",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 14,
      minWidth: 100,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(6,182,212,0.18)",
    },
  },
  {
    id: "americium241",
    data: { label: "Americium-241" },
    position: { x: 1000, y: 920 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #06b6d4",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 14,
      minWidth: 120,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(6,182,212,0.18)",
    },
  },
  // Third level nodes - Research
  {
    id: "researchApplications",
    data: { label: "Research Applications" },
    position: { x: 1000, y: 1050 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #ec4899",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 14,
      minWidth: 140,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(236,72,153,0.18)",
    },
  },
  {
    id: "researchIsotopes",
    data: { label: "Isotopes Used in Research" },
    position: { x: 1000, y: 1120 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #ec4899",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 14,
      minWidth: 160,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(236,72,153,0.18)",
    },
  },
  // Fourth level nodes
  {
    id: "fission",
    data: { label: "Fission" },
    position: { x: 1400, y: 80 },
    style: {
      background: "#1a1a1a",
      color: "#fff",
      border: "1px solid #8b5cf6",
      borderRadius: 8,
      fontWeight: 400,
      fontSize: 12,
      minWidth: 80,
      textAlign: "center",
      boxShadow: "0 1px 8px 0 rgba(139,92,246,0.15)",
    },
  },
  {
    id: "fusion",
    data: { label: "Fusion" },
    position: { x: 1400, y: 150 },
    style: {
      background: "#1a1a1a",
      color: "#fff",
      border: "1px solid #8b5cf6",
      borderRadius: 8,
      fontWeight: 400,
      fontSize: 12,
      minWidth: 80,
      textAlign: "center",
      boxShadow: "0 1px 8px 0 rgba(139,92,246,0.15)",
    },
  },
  {
    id: "production",
    data: { label: "Production" },
    position: { x: 1400, y: 220 },
    style: {
      background: "#1a1a1a",
      color: "#fff",
      border: "1px solid #8b5cf6",
      borderRadius: 8,
      fontWeight: 400,
      fontSize: 12,
      minWidth: 100,
      textAlign: "center",
      boxShadow: "0 1px 8px 0 rgba(139,92,246,0.15)",
    },
  },
  {
    id: "fluorine18",
    data: { label: "Fluorine-18 (F-18)" },
    position: { x: 1400, y: 330 },
    style: {
      background: "#1a1a1a",
      color: "#fff",
      border: "1px solid #10b981",
      borderRadius: 8,
      fontWeight: 400,
      fontSize: 12,
      minWidth: 120,
      textAlign: "center",
      boxShadow: "0 1px 8px 0 rgba(16,185,129,0.15)",
    },
  },
  {
    id: "technetium99m",
    data: { label: "Technetium-99m (Tc-99m)" },
    position: { x: 1400, y: 400 },
    style: {
      background: "#1a1a1a",
      color: "#fff",
      border: "1px solid #10b981",
      borderRadius: 8,
      fontWeight: 400,
      fontSize: 12,
      minWidth: 140,
      textAlign: "center",
      boxShadow: "0 1px 8px 0 rgba(16,185,129,0.15)",
    },
  },
  {
    id: "iodine131Cobalt60",
    data: { label: "I-131 and Co-60" },
    position: { x: 1400, y: 470 },
    style: {
      background: "#1a1a1a",
      color: "#fff",
      border: "1px solid #10b981",
      borderRadius: 8,
      fontWeight: 400,
      fontSize: 12,
      minWidth: 120,
      textAlign: "center",
      boxShadow: "0 1px 8px 0 rgba(16,185,129,0.15)",
    },
  },
  {
    id: "iridium192",
    data: { label: "Iridium-192 (Ir-192)" },
    position: { x: 1400, y: 540 },
    style: {
      background: "#1a1a1a",
      color: "#fff",
      border: "1px solid #10b981",
      borderRadius: 8,
      fontWeight: 400,
      fontSize: 12,
      minWidth: 140,
      textAlign: "center",
      boxShadow: "0 1px 8px 0 rgba(16,185,129,0.15)",
    },
  },
];

const edges = [
  // Main connections
  {
    id: "main-basicKnowledge",
    source: "main",
    target: "basicKnowledge",
    type: "smoothstep",
    style: { stroke: "#6366f1", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#6366f1" },
  },
  {
    id: "main-overviewNuclearMedicine",
    source: "main",
    target: "overviewNuclearMedicine",
    type: "smoothstep",
    style: { stroke: "#10b981", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#10b981" },
  },
  {
    id: "main-nuclearAgriculture",
    source: "main",
    target: "nuclearAgriculture",
    type: "smoothstep",
    style: { stroke: "#f59e0b", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#f59e0b" },
  },
  {
    id: "main-industrialRadiography",
    source: "main",
    target: "industrialRadiography",
    type: "smoothstep",
    style: { stroke: "#ef4444", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#ef4444" },
  },
  {
    id: "main-gauging",
    source: "main",
    target: "gauging",
    type: "smoothstep",
    style: { stroke: "#06b6d4", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#06b6d4" },
  },
  {
    id: "main-nuclearResearch",
    source: "main",
    target: "nuclearResearch",
    type: "smoothstep",
    style: { stroke: "#ec4899", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#ec4899" },
  },
  // Basic Knowledge connections
  {
    id: "basicKnowledge-definition",
    source: "basicKnowledge",
    target: "definition",
    type: "smoothstep",
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#8b5cf6" },
  },
  {
    id: "basicKnowledge-typesOfReactions",
    source: "basicKnowledge",
    target: "typesOfReactions",
    type: "smoothstep",
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#8b5cf6" },
  },
  {
    id: "basicKnowledge-isotopes",
    source: "basicKnowledge",
    target: "isotopes",
    type: "smoothstep",
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#8b5cf6" },
  },
  // Types of Reactions connections
  {
    id: "typesOfReactions-fission",
    source: "typesOfReactions",
    target: "fission",
    type: "smoothstep",
    style: { stroke: "#8b5cf6", strokeWidth: 1.5 },
    markerEnd: { type: "arrowclosed", color: "#8b5cf6" },
  },
  {
    id: "typesOfReactions-fusion",
    source: "typesOfReactions",
    target: "fusion",
    type: "smoothstep",
    style: { stroke: "#8b5cf6", strokeWidth: 1.5 },
    markerEnd: { type: "arrowclosed", color: "#8b5cf6" },
  },
  // Isotopes connections
  {
    id: "isotopes-production",
    source: "isotopes",
    target: "production",
    type: "smoothstep",
    style: { stroke: "#8b5cf6", strokeWidth: 1.5 },
    markerEnd: { type: "arrowclosed", color: "#8b5cf6" },
  },
  // Nuclear Medicine connections
  {
    id: "overviewNuclearMedicine-diagnosticApplications",
    source: "overviewNuclearMedicine",
    target: "diagnosticApplications",
    type: "smoothstep",
    style: { stroke: "#10b981", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#10b981" },
  },
  {
    id: "overviewNuclearMedicine-therapeuticApplications",
    source: "overviewNuclearMedicine",
    target: "therapeuticApplications",
    type: "smoothstep",
    style: { stroke: "#10b981", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#10b981" },
  },
  // Diagnostic Applications connections
  {
    id: "diagnosticApplications-fluorine18",
    source: "diagnosticApplications",
    target: "fluorine18",
    type: "smoothstep",
    style: { stroke: "#10b981", strokeWidth: 1.5 },
    markerEnd: { type: "arrowclosed", color: "#10b981" },
  },
  {
    id: "diagnosticApplications-technetium99m",
    source: "diagnosticApplications",
    target: "technetium99m",
    type: "smoothstep",
    style: { stroke: "#10b981", strokeWidth: 1.5 },
    markerEnd: { type: "arrowclosed", color: "#10b981" },
  },
  // Therapeutic Applications connections
  {
    id: "therapeuticApplications-iodine131Cobalt60",
    source: "therapeuticApplications",
    target: "iodine131Cobalt60",
    type: "smoothstep",
    style: { stroke: "#10b981", strokeWidth: 1.5 },
    markerEnd: { type: "arrowclosed", color: "#10b981" },
  },
  {
    id: "therapeuticApplications-iridium192",
    source: "therapeuticApplications",
    target: "iridium192",
    type: "smoothstep",
    style: { stroke: "#10b981", strokeWidth: 1.5 },
    markerEnd: { type: "arrowclosed", color: "#10b981" },
  },
  // Agriculture connections
  {
    id: "nuclearAgriculture-carbon14",
    source: "nuclearAgriculture",
    target: "carbon14",
    type: "smoothstep",
    style: { stroke: "#f59e0b", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#f59e0b" },
  },
  // Industrial Radiography connections
  {
    id: "industrialRadiography-specificApplications",
    source: "industrialRadiography",
    target: "specificApplications",
    type: "smoothstep",
    style: { stroke: "#ef4444", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#ef4444" },
  },
  {
    id: "industrialRadiography-iridium192Industrial",
    source: "industrialRadiography",
    target: "iridium192Industrial",
    type: "smoothstep",
    style: { stroke: "#ef4444", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#ef4444" },
  },
  {
    id: "industrialRadiography-nepalEarthquake",
    source: "industrialRadiography",
    target: "nepalEarthquake",
    type: "smoothstep",
    style: { stroke: "#ef4444", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#ef4444" },
  },
  // Gauging connections
  {
    id: "gauging-caesium137",
    source: "gauging",
    target: "caesium137",
    type: "smoothstep",
    style: { stroke: "#06b6d4", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#06b6d4" },
  },
  {
    id: "gauging-americium241",
    source: "gauging",
    target: "americium241",
    type: "smoothstep",
    style: { stroke: "#06b6d4", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#06b6d4" },
  },
  // Research connections
  {
    id: "nuclearResearch-researchApplications",
    source: "nuclearResearch",
    target: "researchApplications",
    type: "smoothstep",
    style: { stroke: "#ec4899", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#ec4899" },
  },
  {
    id: "nuclearResearch-researchIsotopes",
    source: "nuclearResearch",
    target: "researchIsotopes",
    type: "smoothstep",
    style: { stroke: "#ec4899", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "#ec4899" },
  },
];

function MindMapFlow() {
  const [selected, setSelected] = useState(null);

  return (
    <div
      style={{ width: "100%", height: 500 }}
      className="rounded-2xl bg-black/60 shadow-xl border border-gray-800 relative"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{
          padding: 0.2,
          includeHiddenNodes: false,
          minZoom: 0.5,
          maxZoom: 1.5,
        }}
        panOnDrag
        zoomOnScroll
        defaultEdgeOptions={{ animated: true }}
        style={{ background: "transparent" }}
        onNodeClick={(_, node) => setSelected(node.id)}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <MiniMap nodeColor={() => "#6366f1"} maskColor="#18181b" />
        <Controls showInteractive={false} />
        <Background color="#23272f" gap={32} />
      </ReactFlow>
      {/* Modal Popup */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-700/90 border border-gray-700 rounded-2xl shadow-2xl p-8 min-w-[320px] max-w-[90vw] max-h-[80vh] flex flex-col items-center justify-center animate-pop-up">
            <button
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/70 hover:bg-gray-700 text-gray-300 hover:text-white transition"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-white mb-2 text-center drop-shadow-lg">
              {nodeDetails[selected]?.title}
            </h2>
            <p className="text-gray-300 text-center text-lg mb-2">
              {nodeDetails[selected]?.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Chatbot Component
function ChatbotModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! I'm your Half Life ROI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        content: getBotResponse(inputMessage),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("quiz") || lowerMessage.includes("test")) {
      return "We have interactive quizzes in various domains like Space Technology, Agriculture, Medical, and more! You can find them in the Quiz section.";
    } else if (
      lowerMessage.includes("calculator") ||
      lowerMessage.includes("calculate")
    ) {
      return "Our calculator section provides tools for ROI analysis and half-life calculations. Check it out!";
    } else if (
      lowerMessage.includes("isotope") ||
      lowerMessage.includes("nuclear")
    ) {
      return "Explore our Isotope Game to learn about nuclear physics and real-world applications in medicine, agriculture, and industry!";
    } else if (
      lowerMessage.includes("team") ||
      lowerMessage.includes("about")
    ) {
      return "Our team consists of Computer Scientists, Economists, and a Nuclear Scientist working together on this project. Check out the About Us section!";
    } else if (
      lowerMessage.includes("help") ||
      lowerMessage.includes("support")
    ) {
      return "I can help you navigate the site, explain features, or answer questions about Half Life ROI. What would you like to know?";
    } else {
      return "That's interesting! I can help you explore our features like quizzes, calculators, isotope games, and more. What would you like to learn about?";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl animate-zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🤖</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">
                Half Life ROI Assistant
              </h3>
              <p className="text-gray-400 text-sm">AI-powered help</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-gray-800/80 text-gray-200 border border-gray-700"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.type === "user" ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Floating Chat Button
function FloatingChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110 z-40 animate-pulse-glow"
    >
      <span className="text-2xl">💬</span>
    </button>
  );
}

export default function Home() {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const videoRef = useRef(null);

  // Auto-play video when it comes into view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is visible - play it
            video.play().catch((error) => {
              console.log('Auto-play prevented:', error);
            });
          } else {
            // Video is not visible - pause it
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of video is visible
        rootMargin: '0px 0px -100px 0px' // Add some margin for better UX
      }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-black flex flex-col items-center p-4 relative overflow-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-30 rounded-full blur-3xl animate-bg-move1 top-[-20%] left-[-20%]" />
        <div className="absolute w-[40vw] h-[40vw] bg-gradient-to-tr from-fuchsia-800 via-indigo-900 to-black opacity-20 rounded-full blur-2xl animate-bg-move2 bottom-[-15%] right-[-10%]" />
      </div>

      {/* Navigation Bar - Fixed at top */}
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-xl bg-black/80 backdrop-blur-md border border-gray-800 mt-8 z-10 fixed top-8 left-1/2 transform -translate-x-1/2">
        <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-white/80 to-gray-400/30 rounded-full flex items-center justify-center">
              {/* Placeholder for logo */}
              <span className="text-2xl font-bold text-black/80">◎</span>
            </div>
          </div>
          {/* Menu */}
          <ul className="hidden md:flex gap-2 bg-gray-900/70 rounded-full px-4 py-2 text-sm font-medium text-gray-200">
            <li>
              <a
                href="#home"
                className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#mindmap"
                className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block"
              >
                Mindmap
              </a>
            </li>
            <li>
              <a
                href="#quiz"
                className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block"
              >
                Quiz
              </a>
            </li>
            <li>
              <a
                href="#isotope-game"
                className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block"
              >
                Isotope Game
              </a>
            </li>
            <li>
              <a
                href="#videos"
                className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block"
              >
                Videos
              </a>
            </li>
            <li>
              <a
                href="#calculator"
                className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block"
              >
                Calculator
              </a>
            </li>
            <li>
              <a
                href="#aboutus"
                className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block"
              >
                About Us
              </a>
            </li>
          </ul>
          {/* Create Account */}
          <button className="ml-4 px-5 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition text-sm hidden md:block">
            Create Account
          </button>
        </nav>
      </div>

      {/* Content Sections */}
      <div className="w-full max-w-6xl mt-32">
        {/* Home Section */}
        <section
          id="home"
          className="w-full min-h-screen flex flex-col items-center justify-center scroll-mt-32"
        >
          <div className="flex flex-col items-center justify-center w-full py-20">
            <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-br from-white via-gray-300 to-gray-500 bg-clip-text text-transparent tracking-tight drop-shadow-lg text-center animate-pulse">
              Half Life ROI
            </h1>
            <span className="mt-6 text-2xl md:text-3xl font-mono text-gray-400 tracking-widest uppercase letter-spacing-wider bg-gray-900/60 px-6 py-2 rounded-full shadow-lg animate-fade-in">
              by Code Wizard
            </span>
          </div>
        </section>

        {/* Mindmap Section */}
        <section
          id="mindmap"
          className="w-full min-h-screen flex flex-col items-center justify-center scroll-mt-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Nuclear Technology Mindmap
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore the comprehensive structure of nuclear technology
              applications beyond energy generation
            </p>
            <div className="flex justify-center mt-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Interactive
              </span>
              <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Educational
              </span>
              <span className="bg-gradient-to-r from-pink-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Comprehensive
              </span>
            </div>
          </div>

          <div className="w-full max-w-7xl px-4">
            <MindMapFlow />
          </div>
        </section>

        {/* Quiz Section */}
        <section
          id="quiz"
          className="w-full min-h-screen flex flex-col items-center justify-center scroll-mt-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent mb-4">
              Knowledge Quest
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Test your expertise with our comprehensive quiz system designed to
              challenge and educate
            </p>
            <div className="flex justify-center mt-4">
              <span className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                MCQ
              </span>
              <span className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                True/False
              </span>
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Interactive
              </span>
            </div>
          </div>

          {/* Domain Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
            {/* Space Technology */}
            <div
              className="group cursor-pointer"
              onClick={() => (window.location.href = "/quiz-studios/space")}
            >
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Space Technology
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Explore the cosmos through interactive quizzes
                  </p>
                </div>
              </div>
            </div>

            {/* Agriculture */}
            <div
              className="group cursor-pointer"
              onClick={() =>
                (window.location.href = "/quiz-studios/agriculture")
              }
            >
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🌾</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Agriculture
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Test your knowledge of farming and crops
                  </p>
                </div>
              </div>
            </div>

            {/* Medical */}
            <div
              className="group cursor-pointer"
              onClick={() => (window.location.href = "/quiz-studios/medical")}
            >
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-red-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Medical</h3>
                  <p className="text-gray-400 text-sm">
                    Challenge yourself with healthcare knowledge
                  </p>
                </div>
              </div>
            </div>

            {/* Technology */}
            <div
              className="group cursor-pointer"
              onClick={() =>
                (window.location.href = "/quiz-studios/technology")
              }
            >
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">💻</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Technology
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Dive into the world of tech and innovation
                  </p>
                </div>
              </div>
            </div>

            {/* Finance */}
            <div
              className="group cursor-pointer"
              onClick={() => (window.location.href = "/quiz-studios/finance")}
            >
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Finance</h3>
                  <p className="text-gray-400 text-sm">
                    Master the art of money and investments
                  </p>
                </div>
              </div>
            </div>

            {/* Environment */}
            <div
              className="group cursor-pointer"
              onClick={() =>
                (window.location.href = "/quiz-studios/environment")
              }
            >
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-teal-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Environment
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Learn about our planet and sustainability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Isotope Game Section */}
        <section
          id="isotope-game"
          className="w-full min-h-screen flex flex-col items-center justify-center scroll-mt-32 mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
              Isotope Game
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the fascinating world of isotopes through interactive
              learning scenarios
            </p>
            <div className="flex justify-center mt-4">
              <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Interactive
              </span>
              <span className="bg-gradient-to-r from-pink-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Educational
              </span>
              <span className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Fun
              </span>
            </div>
          </div>

          <div className="w-full max-w-6xl px-4">
            <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-8 hover-lift">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md border border-purple-700 rounded-xl p-6 hover:border-purple-500 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🏥</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      Medicine
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Medical imaging & treatment
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/80 to-emerald-900/80 backdrop-blur-md border border-green-700 rounded-xl p-6 hover:border-green-500 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🌾</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      Agriculture
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Crop improvement & pest control
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-900/80 to-red-900/80 backdrop-blur-md border border-orange-700 rounded-xl p-6 hover:border-orange-500 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🏭</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      Industry
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Quality control & testing
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => (window.location.href = "/isotope-game")}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all text-lg hover-lift animate-pulse-glow"
                >
                  Start Learning Game
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section
          id="videos"
          className="w-full min-h-screen flex flex-col items-center justify-center scroll-mt-32 mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
              Shorts
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Learn through engaging video content about nuclear physics, ROI
              calculations, and real-world applications
            </p>
            <div className="flex justify-center mt-4">
              <span className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                HD Quality
              </span>
              <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Interactive
              </span>
              <span className="bg-gradient-to-r from-red-500 to-yellow-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Educational
              </span>
            </div>
          </div>
          
          {/* Video Player */}
          <div className="w-full max-w-4xl px-4 mb-8">
            <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-8 hover-lift">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-600 overflow-hidden mb-6">
                {/* Video with auto-play on scroll visibility */}
                <video 
                  ref={videoRef}
                  className="w-full h-full rounded-xl"
                  controls
                  preload="metadata"
                  muted
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23374151'/%3E%3Ccircle cx='8' cy='4.5' r='2' fill='%23f59e0b'/%3E%3C/svg%3E"
                >
                  {/* Video source from S3 bucket */}
                  <source 
                    src="https://half-life-roi.s3.ap-southeast-1.amazonaws.com/1234.MOV" 
                    type="video/mp4" 
                  />
                  
                  {/* Fallback text for browsers that don't support video */}
                  <p className="text-center text-gray-400 p-8">
                    Your browser does not support the video tag. 
                    <br />
                    <a 
                      href="https://half-life-roi.s3.ap-southeast-1.amazonaws.com/1234.MOV" 
                      className="text-yellow-500 hover:text-yellow-400 underline"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Click here to download the video
                    </a>
                  </p>
                </video>
              </div>
            </div>
          </div>
          

        </section>

        {/* Calculator Section */}
        <section
          id="calculator"
          className="w-full min-h-screen flex flex-col items-center justify-center scroll-mt-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Precision Tools
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Advanced calculators for ROI analysis and half-life calculations
              with real-time results
            </p>
            <div className="flex justify-center mt-4">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                ROI Calc
              </span>
              <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Half-life
              </span>
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Real-time
              </span>
            </div>
          </div>
          <div className="text-4xl text-gray-200 font-bold">
            Calculator Section (placeholder)
          </div>
        </section>

        {/* About Us Section */}
        <section
          id="aboutus"
          className="w-full min-h-screen flex flex-col items-center justify-center scroll-mt-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-violet-500 bg-clip-text text-transparent mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the passionate minds behind Half Life ROI and our mission
              to revolutionize financial technology
            </p>
            <div className="flex justify-center mt-4">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Innovators
              </span>
              <span className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Experts
              </span>
              <span className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Visionaries
              </span>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
            {/* Team Member 1 */}
            <div className="group cursor-pointer hover-lift">
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">👨‍💻</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Mohamed Fawas Mohamed Shimer
                  </h3>
                  <p className="text-indigo-400 font-semibold mb-3">
                    Computer Scientist
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Expert in algorithms, data structures, and computational
                    theory with focus on financial technology applications.
                  </p>
                  <div className="flex justify-center gap-2">
                    <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs">
                      Algorithms
                    </span>
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">
                      Data Science
                    </span>
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">
                      FinTech
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="group cursor-pointer hover-lift">
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">👨‍💻</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Kuruppuge Sanuga Lakdinu Kuruppu
                  </h3>
                  <p className="text-purple-400 font-semibold mb-3">
                    Computer Scientist
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Specialized in software engineering and system architecture
                    for financial technology platforms.
                  </p>
                  <div className="flex justify-center gap-2">
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">
                      Software Eng
                    </span>
                    <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs">
                      Architecture
                    </span>
                    <span className="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-xs">
                      Systems
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="group cursor-pointer hover-lift">
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-green-500 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">👩‍💼</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Alibekova Kamila
                  </h3>
                  <p className="text-green-400 font-semibold mb-3">Economist</p>
                  <p className="text-gray-400 text-sm mb-4">
                    Economic analyst specializing in financial markets,
                    investment strategies, and market trends.
                  </p>
                  <div className="flex justify-center gap-2">
                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs">
                      Financial Markets
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs">
                      Investment
                    </span>
                    <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs">
                      Analysis
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="group cursor-pointer hover-lift">
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-orange-500 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">👨‍💼</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Nguyen Duy Anh Dung
                  </h3>
                  <p className="text-orange-400 font-semibold mb-3">
                    Economist
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Economic researcher focused on ROI analysis, financial
                    modeling, and economic forecasting.
                  </p>
                  <div className="flex justify-center gap-2">
                    <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs">
                      ROI Analysis
                    </span>
                    <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs">
                      Modeling
                    </span>
                    <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs">
                      Forecasting
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 5 */}
            <div className="group cursor-pointer hover-lift">
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">👩‍🔬</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Pham Ngo Quyen Anh
                  </h3>
                  <p className="text-blue-400 font-semibold mb-3">
                    Nuclear Scientist
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Nuclear physicist specializing in half-life calculations and
                    radioactive decay modeling.
                  </p>
                  <div className="flex justify-center gap-2">
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">
                      Half-Life
                    </span>
                    <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs">
                      Nuclear Physics
                    </span>
                    <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs">
                      Decay Models
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 6 */}
            <div className="group cursor-pointer hover-lift">
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-pink-500 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">👩‍💼</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Peiris Modarage Himara Harshitha
                  </h3>
                  <p className="text-pink-400 font-semibold mb-3">Economist</p>
                  <p className="text-gray-400 text-sm mb-4">
                    Economic analyst with expertise in financial risk assessment
                    and market dynamics.
                  </p>
                  <div className="flex justify-center gap-2">
                    <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs">
                      Risk Assessment
                    </span>
                    <span className="bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-xs">
                      Market Dynamics
                    </span>
                    <span className="bg-fuchsia-500/20 text-fuchsia-300 px-3 py-1 rounded-full text-xs">
                      Analysis
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 7 */}
            <div className="group cursor-pointer hover-lift">
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-teal-500 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">👩‍💼</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Nguyen Thi Hong Khanh
                  </h3>
                  <p className="text-teal-400 font-semibold mb-3">Economist</p>
                  <p className="text-gray-400 text-sm mb-4">
                    Economic researcher specializing in financial policy
                    analysis and economic development.
                  </p>
                  <div className="flex justify-center gap-2">
                    <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs">
                      Policy Analysis
                    </span>
                    <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs">
                      Development
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs">
                      Research
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Stats */}
          <div className="mt-16 w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  10K+
                </div>
                <div className="text-gray-400 text-sm">Total Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
                  99.9%
                </div>
                <div className="text-gray-400 text-sm">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <div className="text-gray-400 text-sm">Support</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-gray-900/80 backdrop-blur-md border-t border-gray-800 mt-20">
        <div className="w-full px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-white/80 to-gray-400/30 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-black/80">◎</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Half Life ROI
                </h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Revolutionizing financial technology with advanced ROI
                calculations, interactive quizzes, and cutting-edge tools for
                modern investors and analysts.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors group"
                >
                  <span className="text-white group-hover:scale-110 transition-transform">
                    📧
                  </span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors group"
                >
                  <span className="text-white group-hover:scale-110 transition-transform">
                    🐦
                  </span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors group"
                >
                  <span className="text-white group-hover:scale-110 transition-transform">
                    💼
                  </span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors group"
                >
                  <span className="text-white group-hover:scale-110 transition-transform">
                    📱
                  </span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#home"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#mindmap"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                    Mindmap
                  </a>
                </li>
                <li>
                  <a
                    href="#quiz"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                    Quiz
                  </a>
                </li>
                <li>
                  <a
                    href="#isotope-game"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                    Isotope Game
                  </a>
                </li>
                <li>
                  <a
                    href="#videos"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                    Videos
                  </a>
                </li>
                <li>
                  <a
                    href="#calculator"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                    Calculator
                  </a>
                </li>
                <li>
                  <a
                    href="#aboutus"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400">
                  <span className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center">
                    📧
                  </span>
                  <span>contact@halflife-roi.com</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <span className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                    📞
                  </span>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <span className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center">
                    📍
                  </span>
                  <span>Code Wizard HQ</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <span className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center">
                    ⏰
                  </span>
                  <span>24/7 Support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2024 Half Life ROI by Code Wizard. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot Modal */}
      <ChatbotModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />
      {/* Floating Chat Button */}
      <FloatingChatButton onClick={() => setIsChatModalOpen(true)} />
    </div>
  );
}
