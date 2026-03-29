---
layout: page
title: Scene-aware Data Augmentation
description: Ken Yu's scene-aware data augmentation research improves training data for computer vision and autonomous driving models.
img: assets/img/preview/scene_aware.png
importance: 3
category: Research
related_publications: master_thesis
keywords: Ken Yu scene-aware data augmentation, computer vision data augmentation, autonomous driving dataset, perception research
---

<!-- hyperlink icon
<div class="row" style="margin-bottom: 20px;">
    <div class="col-sm mt-3 mt-md-0 text-center">
        <div class="icon-with-text">
            <a href="{{ 'CVGIP_DepthLab_paper.pdf' | prepend: 'assets/pdf/' | relative_url}}" target="_blank" rel="noopener noreferrer">
            <span class="icon-text h3">Paper</span>
            <i class="fa-solid fa-file-pdf h3"></i></a>
        </div>
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        <div class="icon-with-text">
            <a href="{{ 'CVGIP_DepthLab_ppt.pdf' | prepend: 'assets/pdf/' | relative_url}}" target="_blank" rel="noopener noreferrer">
            <span class="icon-text h3">Slides</span>
            <i class="fa-solid fa-file-pdf h3"></i></a>
        </div>
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        <div class="icon-with-text">
            <a href="https://github.com/KenYu910645/detectron2/tree/main/projects/Panoptic-DepthLab" target="_blank" rel="noopener noreferrer">
            <span class="icon-text h3">GitHub</span>
            <i class="fa-brands fa-github h3"></i></a>
        </div>
    </div>
</div> -->

## Summary

This research project studies scene-aware data augmentation for computer vision. Ken Yu explored how to place copied instances into new scenes more realistically so perception models can learn from richer and more plausible synthetic training examples.

**Focus areas:** data augmentation, scene understanding, instance placement, perception model training.

## Motivation

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_scene_aware_da/issue.png" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    
</div>

## Related Work

- [Panoptic-DepthLab](/projects/project_panoptic_depthlab/) for segmentation and depth prediction.
- [Perspective-aware Convolution](/projects/project_pac/) for monocular 3D object detection.
- [Publications](/publications/) for related research and thesis output.

## Introduction

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_scene_aware_da/intro_1.png" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_scene_aware_da/intro_2.png" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_scene_aware_da/intro_3.png" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    
</div>

## Approach

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_scene_aware_da/method_1.png" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    
</div>

## Result

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_scene_aware_da/result_1.png" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_scene_aware_da/result_2.png" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_scene_aware_da/result_3.png" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_scene_aware_da/result_4.png" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_scene_aware_da/result_5.png" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_scene_aware_da/result_6.png" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    
</div>
