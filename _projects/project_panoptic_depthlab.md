---
layout: page
title: Panoptic-DepthLab
description: Combination of Panoptic Segmentation and Depth Estimation
img: assets/img/preview/panoptic_depthlab_project.jpg
importance: 1
category: Research
related_publications: panoptic_seg
---

<!-- hyperlink icon  -->
<div class="row">
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
</div>

## Motivation

Image segmentation, which dissects and interprets each pixel in an image, has been around for some time. Yet, integrating depth prediction directly into the segmentation network is uncharted territory, and that's precisely what I aim to tackle. By blending image segmentation with depth estimation, my goal is a more holistic and detailed than traditional image segmentation alone.

## Introduction - Image Segmentation

The goal image segmentation is to categorize pixels into segments based on similar semantic meanings or their association with the same object. This task can be divided into three main types: semantic, instance, and panoptic segmentation.

Semantic segmentation involves classifying each pixel into specific categories. For example, pixels representing the sky are classified as 'sky', and those representing a car as 'vehicle'. This is essentially pixel-wise classification.

Instance segmentation, on the other hand, only cares about foreground objects and focuses on classfying and differentiating them into pedestrians, cars, and cyclists. Note that, every instance need to be recongized as different instance even when they belong to the same class.

Lastly, panoptic segmentation combines semantic and instance segmentation. It applies pixel-wise classification to background elements and instance segmentation to foreground objects. As a relatively new concept, panoptic segmentation offers a detailed and more comprehensive understanding of the scene.

However, we believe that panoptic segmentation alone doesn't fully meet the safety requirements for self-driving cars. To address this, we propose integrating depth into segments. This enhancement would enable the algorithm to predict the depth of each segment, adding an essential dimension to our understanding of the scene. Their relationship is illustrated below.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_panoptic_depthlab/intro.jpg" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Our enhanced network, adapted from Panoptic DeepLab, integrates a novel decoder branch dedicated to depth estimation. We employ ResNet-52 as the encoder to extract image features. Each decoder branch follows a similar architecture, utilizing ASPP and incorporating fine-grain features prior to downsampling, to preserve the intricate details of the image.
</div>

## Approach

Our strategy to merge depth estimation with panoptic segmentation begins with a robust panoptic segmentation framework known as Panoptic-DeepLab. We've added a new depth estimation decoder branch alongside the existing branches for semantic segmentation and class-agnostic instance grouping. This configuration allows all decoder branches to leverage the same features extracted by the encoder, enhancing the efficiency of the integration. Note that the segmentation and depth branches are structurally similar, they operate with distinct weights.

To unify the outcomes of segmentation and depth estimation, we map corresponding segment regions onto the predicted depth map. We then calculate an average depth value for each segment on the predicted depth map, assigning it as the segment's depth value.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_panoptic_depthlab/new_depthlab.jpg" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_panoptic_depthlab/detail_arch.jpg" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image illustrates the detailed design of our proposed network. Mirroring the architecture of the other two branches, depth estimation branch includes the ASPP module and the upsampling decoder. Notably, all three branches operate with their unique set of weights, distinct from the others.
</div>

## Experiment 

Let's talk about experiment settings. 

Training a panoptic segmentation network from scratch is quite a challenge. To make it more manageable, we utilized pre-trained weights of Panoptic DeepLab provided by Detectron2. This model, trained on the Cityscapes dataset with 2,975 images for 90,000 iterations, provided a solid foundation.

We then incorporated our depth estimation decoder branch into this pre-trained network. We train the enhanced network on the Cityscapes for an additional 10,000 iterations.

Our experiments were conducted on two TITAN RTX GPUs, with a batch size of 14. We used the Adam optimizer, setting the learning rate to 0.001.

Given that Cityscapes doesn't offer ground truth for depth estimation, we created depth maps by converting the provided disparity maps into depth maps.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_panoptic_depthlab/disparity.jpg" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Result 

Displayed below is the panoptic segmentation result, enhanced with our predicted depth values.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_panoptic_depthlab/exp1.jpg" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Background pixels and foreground objects are semantically segmented into distinct categories, each tagged with a category and a depth value indicating its distance (in meters) to the camera. Objects closer to the camera are colored red, those at a medium distance are green, and the furthest objects are depicted in blue.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_panoptic_depthlab/exp2.jpg" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The advanced capabilities of the Panoptic-DeepLab network allow us to distinguish riders from pedestrians by analyzing their association with bicycles.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_panoptic_depthlab/exp3.jpg" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    One issue with our detection results is the poor depth estimation for truncated segments at the image borders. This stems from the Cityscapes dataset we used, which lacks direct ground truth for depth maps. Consequently, we had to convert disparity maps into ground truth. This conversion results in the image boundaries lacking accurate ground truth data, leading to suboptimal depth estimations in these areas.
</div>

## Discussion and Future work
Our method, while promising, still faces several challenges and areas for improvement. Firstly, our depth estimation branch is relatively weak. This is primarily due to limited computational resources, preventing us from training the entire network from scratch. We managed only a 10K iteration fine-tuning, resulting in the depth estimation decoder being less trained than other network parts. This disparity sometimes leads to unreliable depth values.

Secondly, the Cityscapes dataset is quite small, encompassing only around 3000 images for training and validation. Furthermore, it lacks high-quality ground truth for depth maps. These limitations undoubtedly affect the accuracy of our depth estimation.

Finally, Panoptic-DeepLab is currently trained with separate losses for depth estimation and segmentation. In the future, we aim to integrate these into a unified task, potentially enhancing the network's performance and efficiency.

## Conclusion
This project showcases the feasibility of merging two seemingly distinct tasks — depth estimation and segmentation — to enhance the ability of image recongnition algorithm. We found that utilizing the same encoded features for both tasks yields satisfactory results. Through visualization, it's evident that our approach advances image recognition capabilities, effectively leveraging a single image as input. This integration marks a significant step forward in developing more sophisticated and reliable autonomous driving systems.