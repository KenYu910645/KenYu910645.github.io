---
layout: page
title: Luggage Carrying Robot 
description: Autonomous Mobile Vehicle
img: assets/img/preview/amr.png
importance: 3
category: Work
---

<!-- hyperlink icon  -->
<div class="row" style="margin-bottom: 20px;">
    <!-- github icon -->
    <div class="col-sm mt-3 mt-md-0 text-center">
        <div class="icon-with-text">
            <a href="https://github.com/KenYu910645/lucky_navi" target="_blank" rel="noopener noreferrer">
            <span class="icon-text h3">GitHub</span>
            <i class="fa-brands fa-github h3"></i></a>
        </div>
    </div>
</div>

<!-- youtube  -->
<div class="row justify-content-sm-center">
    <div class="col-sm-12">
        {% include video.html path="https://www.youtube.com/embed/QkCkt8oi4F0" width="770px" height="530px" %}
    </div>
</div>
<div class="caption">
    AMR navigate autonomously in Shanghai CitiGo hotel
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm-12">
        {% include video.html path="https://www.youtube.com/embed/8xDUsTweNg0" width="770px" height="530px" %}
    </div>
</div>
<div class="caption">
    AMR navigate autonomously in Hangzhou CitiGo hotel
</div>

## Introduction
We have developed an autonomous vehicle specifically designed for luggage transportation in hotels. This robot's primary task is to carry guests' luggage to their designated hotel rooms upon check-in.

To navigate safely and autonomously through the 8-floor hotel environment, it must dynamically avoid obstacles and reroute as necessary. Additionally, it is capable of operating elevators, ensuring safely enter and exit the elevator.

Our Autonomous Mobile Robot (AMR) is equipped with two 2D LiDAR sensors, positioned at the front and back, to provide a 360-degree view of nearby obstacles. It also features a rear-facing camera and a top-view camera, which are used to detect AprilTag localization landmarks that we pre-installed in the hotel.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_amr/amr_room.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The luggage-carrying AMR operated in hotel
</div>

## Approach - Robot Localization 

To accurately localize the robot within the hotel, we utilize an algorithm based on LiDAR data, known as Adaptive Monte Carlo Localization (AMCL). This robust method compares LiDAR data against the hotel's map to determine the robot's most probable location. Essentially, it is based on particle filter, which consider multiple potential robot locations simultaneously. The estimated robot location is then derived as the mean of all these 'particle' hypotheses.

However, relying solely on 2D LiDAR data for localization in complex environments can be challenging. The robot occasionally loses its bearings in long corridors, where the algorithm struggles to converge due to indistinct environmental features.

To address this issue, we've placed fiducial markers in hotel. These markers are detected by the robot's top-view and rear-view cameras, serving as auxiliary aids in maintaining localization throughout its mission.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_amr/amr_map.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The map of the hotel is manually created. Engineers need to convert 2D building blueprints into a digital map format for the robot's navigation and localization.
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_amr/amr_software.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Screenshot showcasing the robot's localization in action. The green rectangle indicates the robot's position, while the blue dots represent 2D LiDAR points from the rear LiDAR, and the red dots from the front LiDAR. Currently, the robot is in front of a T-section.
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_amr/marker.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fiducial markers we installed on the roof of the hotel
</div>


## Approach - Robot Navigation 

Our navigation algorithm comprises two levels of control: global planners and local planners. The global planner designs a static path from current position to the goal, outlining a general route for the robot. However, due to dynamic obstacles encountered during navigation, a more flexible approach is needed. This is where the local planner comes in. It considers LiDAR data to dynamically avoid obstacles in real-time while adhering to the global path.

For the global planner, we employ an A* algorithm, akin to Dijkstra's but with added heuristic evaluation for improved efficiency. The local planner uses two algorithms: the Dynamic Window Approach (DWA) and a Full State Controller. DWA simulates and evaluates various speed and control commands based on safety, kinematic information, and collision risk. However, DWA alone is insufficient for precise maneuvers such as entering and exiting elevators. For these scenarios, we use the Full State Controller, a low level goal-pursuing motor controller, ensuring safe and accurate elevator navigation.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_amr/a_star_near.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_amr/dijkstra_near.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The main difference between Dijkstra's and the A* algorithm lies in their approach. While similar in structure, the A* algorithm incorporates heuristic evaluation. This heuristic assesses the estimated direct distance from a given location to the goal. Consequently, A* tends to prioritize paths that appear closer to the goal, enabling it to find a route more quickly. This heuristic approach often allows A* to identify an optimal path faster than Dijkstra's algorithm, which doesn't use such a heuristic.
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_amr/a_star_room.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_amr/dijkstra_room.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>