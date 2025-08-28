---
layout: page
title: MapleStory LevleUp AutoBot 
description: An auto levelup bot for MapleStory Artale
img: assets/img/project_maplestory/cover.png
importance: 4
category: Side Projects
---

<!-- hyperlink icon  -->
<div class="row" style="margin-bottom: 20px;">
    <!-- github icon -->
    <div class="col-sm mt-3 mt-md-0 text-center">
        <div class="icon-with-text">
            <a href="https://github.com/KenYu910645/MapleStoryAutoLevelUp" target="_blank" rel="noopener noreferrer">
            <span class="icon-text h3">GitHub</span>
            <i class="fa-brands fa-github h3"></i></a>
        </div>
    </div>
</div>

## Demo Video

<!-- youtube  -->
<div class="row justify-content-sm-center">
    <div class="col-sm-12">
        {% include video.html path="https://www.youtube.com/embed/QeEXLHO8KN4" width="770px" height="530px" %}
    </div>
</div>

## Motivation

MapleStory is an online RPG built around heavy monster grinding. In this game, pushing a character to the next level can mean tens of thousands of repetitive kills and hours of manual labor in front of screen. This project tackles that tedium: it’s an automation bot that “watches” the game window, understands what’s on screen, and executes precise inputs so your character can level up hands-free.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_maplestory/intro.gif" title="MapleStory GIF" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Approach

The bot reads the live gameplay window, uses lightweight computer-vision to locate the player and nearby mobs, then sends simulated keyboard inputs to navigate the map and attack mobs along the route.

### Player location

To begin with, we need to get player location on screen. Early on I tried locating the player by detecting the on-screen name tag, but it was unreliable since mobs and map objects could occluded it sometimes. After a few trail and error, I switched to the other method whihc leverage in-game minimap, which consistently marks the player with a yellow dot on the map.

To get the minimap, the bot crops the minimap ROI, converts it to HSV, applies a yellow color mask, and takes the dot’s centroid to get a precise, per-frame position. The result is fast, robust to occlusion, and consistent across maps.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_maplestory/minimap.png" title="minimap with player location" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### Mobs detection

To detect mobs in the game, I use OpenCV's template matching technique. The mob templates are conveniently available in [here](https://maplestory.io/), which makes it easy to download and integrate them into the bot for detection purposes. These templates are then matched against the current game screen to identify nearby mobs that are within attacking range.

Initially, I used colored template matching, which gave highly accurate results. However, this approach was computationally expensive and caused noticeable FPS drops during gameplay.

To address this, I experimented with more lightweight alternatives. One effective solution was to perform template matching based only on contours of mobs. This method ignores color and focuses purely on shape similarity. While it’s slightly less accurate and occasionally produces false positives, it's significantly faster. After multiple rounds of trial and error, I found this contour-based approach to be the best trade-off between performance and speed, making it the most practical solution for real-time mob detection.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_maplestory/skeleton_soldier.png" title="Mob template download from maplestory.io" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_maplestory/mob_detection.png" title="Mob detection Result" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### Route planning
The route is manually drawn on the map image and automatically loaded when the user selects a map. Each point along the route is encoded with a specific pixel color, where each color represents a different navigation command (e.g., walk left, jump right, climb ladder).

While the bot is running, it continuously monitors the player's current location and searches for the nearest route pixel. Once found, it reads the pixel's color and translates it into a corresponding movement command, enabling the character to follow the route and patrol the map in a smooth, continuous loop.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_maplestory/camp1_route.png" title="Drawn Route Map" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_maplestory/Color Code Table.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### Rune Solver

While grinding, it be may occasionally randomly spawned runes on the map. If left unsolved, the player will not get any EXP by clearing mobs, so the bot must handle them.

The process begins by detecting a special rune alert message using template matching. If this message appears on the screen, it signals that a rune has spawned somewhere on the map. The bot then scans for the rune’s location, and once it is close enough, it will attempt to activate the rune.

Upon activation, a mini-game with directional arrows will pop up. To solve this, the bot uses template matching again—this time to recognize each arrow’s direction. The arrow image that best matches the on-screen direction is selected, and the bot simulates the correct key press accordingly.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_maplestory/rune_solve.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### Finite State Machine
To manage the various behaviors of the bot—such as hunting mobs, finding runes, or solving rune mini-games—I implemented a Finite State Machine (FSM).

Each stage of the bot’s behavior is represented as a distinct state, and transitions between states are clearly defined. For example, when a rune appears, the bot transitions from the "Hunting" state to the "Finding Rune" state, and later to the "Solving Rune" state once it's activated.

The FSM structure makes the codebase much easier to maintain and debug. Each state has its own logic and transition conditions, and the transitions are explicitly declared in the code.

### Health Detection

An essential part of any auto-bot is ensuring the character stays alive. To do this, the bot needs to monitor the player's health (HP) and mana (MP) all the time.

This is achieved by detecting the HP and MP bars in the game UI. Using color masking, the bot isolates red pixels for health and blue pixels for mana. By analyzing the length of the colored bars, it can estimate the remaining percentage of HP or MP with good accuracy.

When the HP drops below a threshold, the bot will automatically trigger a healing spell or use a potion—just in time to prevent death, while also avoiding unnecessary potion waste.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_maplestory/health_bar.png" title="HP/MP/EXP UI" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## UI framework
To make the bot more user-friendly and customizable, I developed a graphical user interface (GUI) using PySide6 (Qt for Python). This UI framework not only exposes all bot settings but also includes real-time debugging tools to help users fine-tune the bot’s behavior.

The GUI includes:

Main Tab – Quick-start panel to configure key options and control start/stop actions.
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_maplestory/main_tab.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Advanced Settings – A more detailed panel for fine-tuning behaviors, like attack logic, potion thresholds, and timers.
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_maplestory/adv_settings_yab.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Visualization Tabs – Real-time windows for game capture preview, mob detection overlays, and route-following debug views.

Users can easily select maps, assign key bindings, adjust bot behavior, and monitor logs—all without modifying any code. The visual feedback tools are especially helpful for debugging, giving users insights into how the bot interprets the game environment.

## Conclusion
With the help of this tool, I was able to level up my level 32 Priest to level 87 in just a few weeks—completely hands-free. Instead of manually grinding monsters for hours, I simply let the bot run overnight and wake up to see how much EXP my character gained and what valuable loot was collected.

Beyond its practical use, this project also demonstrates that computer vision techniques alone are sufficient to automate gameplay in online games like MapleStory. Without needing to access game memory, the bot relies purely on template matching and HSV-based color detection to handle core gameplay tasks.

This approach is not only lightweight and non-intrusive but also highly transferable, making it easy to adapt to other 2D games with similar UI-based mechanics.

## Future Work
Currently, the bot runs effectively and robustly on supported maps for several hours—or even indefinitely. However, adding custom maps is still a manual and time-consuming process. Users must capture the minimap themselves and hand-draw the navigation route, which can be quite challenging, especially for first-time users.

To improve this, future work will focus on automating and simplifying the route planning process. One promising direction is to abstract the route into basic terrain elements—specifically, platforms and ladders, which are common across nearly all maps.

By marking just these two elements, the bot could potentially autonomously generate navigation paths, figuring out how to move between platforms and climb ladders without needing a manually drawn route. This would significantly lower the entry barrier for new users and make the system far more scalable and adaptable to different maps.

