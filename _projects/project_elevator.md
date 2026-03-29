---
layout: page
title: Elevator Control System
description: Ken Yu's elevator control system enables autonomous robots to call elevators, press buttons, and move between floors in real buildings.
img: assets/img/preview/elevator_well.jpg
importance: 4
category: Robotics
keywords: Ken Yu elevator control system, robot elevator integration, autonomous robot infrastructure, robotics project, hotel robot
---

<!-- hyperlink icon  -->
<div class="row" style="margin-bottom: 20px;">
    <!-- github icon -->
    <div class="col-sm mt-3 mt-md-0 text-center">
        <div class="icon-with-text">
            <a href="https://github.com/KenYu910645/elevator_gateway" target="_blank" rel="noopener noreferrer">
            <span class="icon-text h3">GitHub</span>
            <i class="fa-brands fa-github h3"></i></a>
        </div>
    </div>
</div>

## Summary

This robotics infrastructure project by Ken Yu enables autonomous mobile robots to use elevators safely in hotels and similar buildings. The system combines an elevator server, a button control board, and wireless communication so robots can call elevators, select floors, and avoid entering crowded cabins.

**Tech stack:** embedded control board, wireless communication over Bluetooth and Wi-Fi, robot-elevator gateway software, occupancy-aware elevator logic.

<!-- elevator gif  -->
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_elevator/elevator_gateway.gif" title="Elevator Gateway Testing Program" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Elevator simulation program for testing our elevator controller
</div>

## Introduction

To enable the autonomous robot to travel between different hotel floors, we developed an elevator control system. This system is designed to respond to the robot's commands, managing tasks such as opening and closing elevators doors and pressing the floor buttons as needed.

## Approach

We installed two hardware components to the elevator system, avoiding major modifications to its existing elevator control system.

The first hardware is a button control board installed within the elevator. This board can detect the status of each button and press them as needed. The second hardware is the elevator server which can receive robots commands via Bluetooth or Wi-Fi.

<div class="row">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.html path="assets/img/project_elevator/relationship.jpg" title="Elevator Gateway Testing Program" class="img-fluid rounded z-depth-1" width="400" %}
    </div>
</div>
<div class="caption">
    The relationship between our elevator server and the elevator itself allows our robot to call the elevator using wireless communication. The button control board can control the elevator buttons. Notably, it is equipped with the capability to detect if there are people inside the elevator, thus preventing the robot from entering an already crowded elevator.
</div>

## Installation

<div class="row">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.html path="assets/img/project_elevator/elevator_control_board.jpg" title="Elevator Gateway Testing Program" class="img-fluid rounded z-depth-1" width="400"%}
    </div>
</div>
<div class="caption">
    We mounted an elevator control board next to the button panels inside the elevator. This board is designed to detect the status of the buttons and press them as required.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_elevator/elevator_server.jpg" title="Elevator Gateway Testing Program" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    We installed our elevator servers atop the elevator, enabling them to receive wireless commands. These servers facilitate seamless communication between the elevator system and the robot using wireless technology.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/preview/elevator_well.jpg" title="Elevator Gateway Testing Program" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Elevator shaft: A rarely accessed area for most people.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_elevator/crowdy.jpg" title="Elevator Gateway Testing Program" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    When the AMR enters a crowded elevator, it may lead to complaints from hotel guests.
</div>

## Key Results

- Allowed service robots to travel across multiple floors without modifying the original elevator control system.
- Added wireless command delivery between robots and the elevator gateway.
- Built button-state detection and actuation hardware for real elevator panels.
- Improved operational safety by detecting crowded elevator conditions before entry.

## Related Work

- [Luggage Carrying Robot](/projects/project_amr/) for autonomous hotel navigation.
- [Multi-robot Collaboration](/projects/project_multirobot/) for larger-scale robotics coordination.
- [CV](/cv/) for a broader summary of Ken Yu's robotics experience.
