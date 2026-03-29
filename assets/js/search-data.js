const ninja = document.querySelector("ninja-keys");

if (ninja) {
  ninja.data = [
    {
      id: "nav-home",
      title: "About",
      section: "Navigation",
      handler: () => {
        window.location.href = "/";
      },
    },{
          id: "nav-projects",
          title: "Projects",
          description: "Projects by Ken Yu spanning computer vision, robotics, embedded systems, automation, and AI applications in real-world products.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{
          id: "nav-publications",
          title: "Publications",
          description: "Publications by Ken Yu (Jia-Quan Yu) in computer vision, scene understanding, monocular 3D object detection, and related research topics.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{
          id: "nav-cv",
          title: "CV",
          description: "CV of Ken Yu (Jia-Quan Yu), software engineer at MediaTek with experience in computer vision, robotics, embedded systems, and AI tooling.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{
        id: "project-3d-printed-calligraphy",
        title: "3D printed Calligraphy",
        description: "Ken Yu&#39;s 3D printed calligraphy project combines Chinese calligraphy, digital fabrication, and creative engineering.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_3dprinterArt/";
        },
      },{
        id: "project-game-mining-bot",
        title: "Game Mining Bot",
        description: "Ken Yu&#39;s Monster Hunter World mining bot uses automation and computer vision techniques for gameplay assistance.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_MHW/";
        },
      },{
        id: "project-luggage-carrying-robot",
        title: "Luggage Carrying Robot",
        description: "Ken Yu&#39;s autonomous luggage-carrying robot for hotel delivery, localization, obstacle avoidance, and elevator-aware navigation.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_amr/";
        },
      },{
        id: "project-elevator-control-system",
        title: "Elevator Control System",
        description: "Ken Yu&#39;s elevator control system enables autonomous robots to call elevators, press buttons, and move between floors in real buildings.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_elevator/";
        },
      },{
        id: "project-honeyhub",
        title: "HoneyHub",
        description: "Ken Yu&#39;s HoneyHub mobile app helps Pikmin Bloom players coordinate mushroom raids, trade postcards, and manage in-app honey.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_honeyhubs/";
        },
      },{
        id: "project-maplestory-levleup-autobot",
        title: "MapleStory LevleUp AutoBot",
        description: "Ken Yu&#39;s MapleStory Artale autobot automates repetitive gameplay tasks with scripting and computer vision techniques.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_maplestory/";
        },
      },{
        id: "project-machine-learning",
        title: "Machine Learning",
        description: "Ken Yu&#39;s machine learning course project analyzes churn rate patterns and predictive features in user data.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_ml/";
        },
      },{
        id: "project-multi-robot-collaboration",
        title: "Multi-robot Collaboration",
        description: "Ken Yu&#39;s factory autonomous transportation system for multi-robot collaboration, cooperative payload handling, and AMR coordination.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_multirobot/";
        },
      },{
        id: "project-perspective-aware-convolution",
        title: "Perspective-aware Convolution",
        description: "Ken Yu&#39;s perspective-aware convolution project improves monocular 3D object detection for autonomous driving.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_pac/";
        },
      },{
        id: "project-panoptic-depthlab",
        title: "Panoptic-DepthLab",
        description: "Ken Yu&#39;s Panoptic-DepthLab project combines panoptic segmentation and depth estimation for richer scene understanding in computer vision.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_panoptic_depthlab/";
        },
      },{
        id: "project-race-car",
        title: "Race Car",
        description: "Ken Yu&#39;s autonomous race car project applies robotics and control concepts to a self-driving miniature vehicle.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_racecar/";
        },
      },{
        id: "project-safety-metric",
        title: "Safety Metric",
        description: "Ken Yu&#39;s safety metric research for self-driving perception and risk-aware scene understanding.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_safty_metric/";
        },
      },{
        id: "project-scene-aware-data-augmentation",
        title: "Scene-aware Data Augmentation",
        description: "Ken Yu&#39;s scene-aware data augmentation research improves training data for computer vision and autonomous driving models.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_scene_aware_data_augmentation/";
        },
      },{
        id: "project-visual-effects",
        title: "Visual Effects",
        description: "Ken Yu&#39;s visual effects project recreates cinematic lightsaber effects with practical video editing and compositing.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_vfx/";
        },
      },{
        id: "project-auto-hospital-appointment",
        title: "Auto Hospital Appointment",
        description: "Ken Yu&#39;s hospital appointment web crawler automates repetitive booking steps for healthcare scheduling workflows.",
        section: "Projects",
        handler: () => {
          window.location.href = "/projects/project_webcrawler/";
        },
      },];
}
