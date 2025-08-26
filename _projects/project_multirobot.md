---
layout: page
title: Multi-robot Collaboration
description: Factory Autonomous Transportation System
img: assets/img/preview/ocmid.png
importance: 3
category: Robotics
---

<!-- hyperlink icon  -->
<div class="row" style="margin-bottom: 20px;">
    <!-- github icon -->
    <div class="col-sm mt-3 mt-md-0 text-center">
        <div class="icon-with-text">
            <a href="https://github.com/solab-ntu/solamr.git" target="_blank" rel="noopener noreferrer">
            <span class="icon-text h3">GitHub</span>
            <i class="fa-brands fa-github h3"></i></a>
        </div>
    </div>
</div>

## Demo Video

<!-- youtube  -->
<div class="row justify-content-sm-center">
    <div class="col-sm-12">
        {% include video.html path="https://www.youtube.com/embed/uMDF18tFUMg" width="770px" height="530px" %}
    </div>
</div>

## Motivation

Modern factories have an increasing need for efficient transportation of products between different production lines. Traditionally, this task falls to workers, often proving to be cumbersome and labor-intensive. To foster smart factory environments and reduce manual labor, one viable solution is the utilization of autonomous mobile vehicles. Our goal is to develop an autonomous mobile vehicle capable of safely and effectively navigating factory settings while handling such substantial weights.

However, large robots often present difficulties in scheduling and maneuverability in factor setting. To address this, we propose a novel multi-agent transportation system. In our proposed system, each AMR can carry up to 60 kilograms individually, but when combined, they can transport loads of up to 120 kilograms. The key is to develop a system where separated robots can cooperate and move as a unified entity towards a common goal.

## Hardware
Our individual Autonomous Mobile Robot (AMR) is outfitted with two 2D Lidars, one positioned at the front and the other at the rear. It also features a ZED 2 2D stereo camera at the front. The computational platform includes an NVIDIA Nano, tasked with image processing, and a Raspberry Pi 4 for handling all other algorithms. The AMR is powered by two brushed motors with encoders, providing precise wheel movement information. It operates on a 29-volt battery, enabling continuous operation for approximately 30 minutes. Additionally, the AMR is equipped with an engagement mechanism on top, utilized for attaching and dettaching to loads shelf.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_ocmid/amr_real.png" title="Elevator Gateway Testing Program" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    AMR Hardwares
</div>

Our loading platform is constructed using sturdy aluminum structures. At the center of the shelf, there is an engagement pin designed to engage with one of the AMRs. The front of the shelf is pasted with fiducial marker, which is essential for recognizing and localizing the shelf during the AMR's operation.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_ocmid/shelf_reall.png" title="Elevator Gateway Testing Program" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Load shelf
</div>

## Software

Our software architecture is structured as follows: The Nvidia Jetson Nano is tasked with processing the dual camera images. We use RTABMAP as our visual-based SLAM algorithm to build maps while the robot scans the environment. Additionally, we leverage the ZED camera's built-in visual-inertial odometry for accurate estimations of the robot's kinematic information. To recongize load shelf, we use AprilTags (fiducial markers).

Live data from the ZED camera and the Nvidia Jetson Nano is transmitted to the Raspberry Pi via Ethernet. The Raspberry Pi is crucial for processing LIDAR data, which is vital for real-time obstacle avoidance. It also runs navigation algorithms, including A* and the Dynamic Window Approach, to determine optimal navigation commands. These commands are then relayed to our motor control board, the STM32-F446RE.

Additionally, we utilize SMACH as our task manager, which communicates with our server through Wi-Fi.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_ocmid/single_amr.png" title="Elevator Gateway Testing Program" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Software architecture of single AMR
</div>

When two Autonomous Mobile Robots (AMRs) are combined to transport a load towards a common goal, significant software modifications are required. In our non-homogeneous multi-robot system, one AMR is designated as the 'leader', while the other acts as the 'follower'. The leader AMR is responsible for receiving sensor data from the follower and must consolidate this information to calculate navigation commands for both vehicles, ensuring safety and seamless cooperation. In this setup, the leader AMR functions as the front wheels, while the follower AMR acts as the rear wheels.

We also developed an shelf detection algorithm that localize load shelf's four corners using laser scans. This allows us to determine the relatively angle between load shelf and AMRs, which is an important information for our controller. 

Communication between the two AMRs is facilitated by MQTT and Wi-Fi. For navigation, we moved away from the standard DWA local planner and developed our own custom RAP local planner, tailored to this unique configuration. Notably, the follower AMR no longer requires its own navigation algorithm; it simply responds to the commands transmitted from the leader, controlling its motors accordingly.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_ocmid/double_amr.png" title="Elevator Gateway Testing Program" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Software architecture when two AMRs work together
</div>

<div class="text-center">
    <div class="row">
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/project_ocmid/modes_demo.gif" title="Controller Modes" class="img-fluid rounded z-depth-1" %}
        </div>
    </div>
    <div class="caption">
        RAP Controller Modes
    </div>
</div>

Our RAP controllers are capable of switching between three modes, selecting the best one according to the situation. The first mode is the 'Crab Mode', where the front and rear AMRs position themselves parallel to each other, heading in the same direction. This allows the entire shelf to move in any direction without changing its orientation.

The second mode is the 'Differential Mode'. In this configuration, the front and rear AMRs can adopt different angles, providing an efficient turning mechanism that facilitates easier navigation.

The third mode is the 'Rotation Mode', where the front and rear AMRs are positioned perpendicularly (at 90 degrees) relative to the entire unit. This mode is particularly useful when the combined unit needs to rotate around its center instead of moving.

With the ability to switch between these three modes, our RAP controller ensures the AMR unit can navigate through various terrains and obstacles effectively.

<div class="text-center">
    <div class="row">
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/project_ocmid/com.png" title="Elevator Gateway Testing Program" class="img-fluid rounded z-depth-1" %}
        </div>
    </div>
    <div class="caption">
        AMRs use WIFI and MQTT to communication with each other
    </div>
</div>

The RAP planner takes the path generated by the Move Base Global Planner as its input. Its first task is to identify a feasible pursuit goal located on the static global path. The planner's primary objective is to pursue this local goal. It begins by determining which navigation mode to use to effectively reach the local goal. Following this, the planner calculates the desired bearing angles, Theta 1 and Theta 2, corresponding to AMR 1 and AMR 2 respectively.

Once these angles are determined, the planner sends commands to both the front and rear AMRs, directing them to pursue the calculated angles, Theta 1 and Theta 2. This approach ensures coordinated movement and accurate pursuit of the set navigation path.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_ocmid/navi_flow.png" title="Elevator Gateway Testing Program" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    RAP(Relative Angle Pursuit) Controller
</div>

To detect load shelf, we develop an corner detector based by Lidar data. We employ an out-of-the-box object detector; and than, we filter out obstacles that are either too small or too large. Subsequently, we identify potential shaft candidates by examining the geometry of objects.

We don't need to detect all eight corner to localize the entire shaft accurately. Detecting just three of these corners is sufficient to determine its orientation, making the process relatively straightforward. Once the algorithm is applied to the linear scan data, we are able to calculate the angles Theta 1 and Theta 2, which are the relative angle between AMRs and load shelf.

<div class="text-center">
    <div class="row">
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/project_ocmid/shelf_detector.png" title="Shelf Detector" class="img-fluid rounded z-depth-1" width="400"%}
        </div>
    </div>
    <div class="caption">
        Shelf Detector
    </div>
</div>

<div class="text-center">
    <div class="row">
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/project_ocmid/tf_tree.png" title="Elevator Gateway Testing Program" class="img-fluid rounded z-depth-1" %}
        </div>
    </div>
    <div class="caption">
        TF tree fusion
    </div>
</div>

## Conclusion 
In conclusion, our experience demonstrates the feasibility of using a multi-agent AMR system to maneuver heavy loads. Specifically, we have proposed an innovative multi-agent combining mechanism. This mechanism allows multiple robots to join together under a load shaft and navigate cohesively as a unified entity. Our work showcases the potential of collaborative robotics in industrial settings, offering a novel approach to handling substantial loads efficiently.

<div class="text-center">
    <div class="row">
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.html path="assets/img/project_ocmid/human_demo.gif" title="Elevator Gateway Testing Program" class="img-fluid rounded z-depth-1" %}
        </div>
    </div>
</div>