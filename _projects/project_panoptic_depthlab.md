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
</div>

## Motivation

Image segmentation, which dissects and interprets each pixel in an image, has been around for some time. Yet, integrating depth into image segmentation is uncharted territory, and that's what this project is about. By combining image segmentation with depth estimation, I wish to predict the depth of each predicted segments.

## Introduction - Image Segmentation

The goal of image segmentation is to categorize pixels into segments based on similar semantic meanings. This task can be divided into three main types: semantic, instance, and panoptic segmentation.

Semantic segmentation is basically pixel-wise classification. It classifies every pixel and predict whether it's belong to 'sky', 'pavement', or 'car'.

Instance segmentation, on the other hand, only cares about foreground objects and focuses on recongning and differentiating objects. Instance segmentation is considered harder to tackle that sementic segmentation because it needs to tell which object does this pixel belongs despite their similiar apperance and close proximity.

Lastly, panoptic segmentation combines semantic and instance segmentation. It applies pixel-wise classification to background elements and instance segmentation to foreground objects. As a relatively new task, panoptic segmentation offers a detailed and more comprehensive understanding of the scene compare to other two.

Despite the holistic result of panoptic segmentation, we still believe that it's not fully meet the safety requirements for self-driving cars. To address this, we propose integrating depth into each segments. This enhancement would enable the algorithm to predict the depth of each segment, adding another essential dimension to computer understanding of the scene.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_panoptic_depthlab/intro.jpg" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    We want to combine panoptic segmentation and depth estimation so that our network can output not only segments but also its depth value(distance to ego-camera)
</div>

## Approach - Panoptic-Depthlab
We start from a powerful panoptic segmentation framework known as Panoptic-DeepLab; and than, we added a new depth estimation decoder branch alongside other decoder branches for semantic segmentation and class-agnostic instance grouping. This simple adjustment allows all decoder branches to leverage the same features extracted by the encoder, enhancing the efficiency of the integration; therefore, we named our proposed network Panoptic-Depthlab

During training, we use L1 loss to train the depth decoder branch and the total loss of the network is the summation of all three branches loss. 

During inference, we map corresponding segment regions onto the predicted depth map and calculate an average depth value for each segment, assigning it as the segment's depth value.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_panoptic_depthlab/new_depthlab.jpg" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Our proposed network, adapted from Panoptic -eepLab, integrates a novel decoder branch dedicated to depth estimation. We employ ResNet-52 as the encoder to extract image features. Each decoder branch follows a similar architecture, utilizing ASPP module and incorporating fine-grain features prior to downsampling, to preserve the intricate details of the feature map.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_panoptic_depthlab/detail_arch.jpg" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Detailed design of Panoptic-Depthlab. Mirroring the architecture of the other two branches, depth estimation branch includes the ASPP module and the upsampling decoder. Notably, all three branches uses different weights.
</div>

## Experiment 

Training a panoptic segmentation network from scratch is quite a challenge. To make it more manageable, we utilized pre-trained weights of Panoptic-DeepLab provided by Detectron2. This pre-train model, trained on the Cityscapes dataset with 2,975 images for 90,000 iterations, provided a solid foundation for our experiment.

We then incorporated depth estimation decoder branch into the network. We train the enhanced network on the Cityscapes for an additional 10,000 iterations.

Our experiments were conducted on two TITAN RTX GPUs, with a batch size of 14. We used the Adam optimizer, setting the learning rate to 0.001.

Since Cityscapes doesn't offer ground truth for depth estimation, we need to get depth maps by converting the provided disparity maps.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_panoptic_depthlab/disparity.jpg" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Cityscapes only provides disparity map so we convert it to depth map ground true; therefore, there is lots of null value at the image border.   
</div>

## Result 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_panoptic_depthlab/exp1.jpg" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Background pixels and foreground objects are panoptically segmented. every segments is tagged with a category label and a number indicating its depth. Objects closer to the camera are colored red, those at a medium distance are green, and the furthest objects are depicted in blue.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_panoptic_depthlab/exp2.jpg" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The powerful Panoptic-DeepLab network allow us to distinguish riders from pedestrians by analyzing their association with bicycles.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_panoptic_depthlab/exp3.jpg" title="Intro image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    One issue with our detection results is the poor depth result for truncated segments at the image borders. This is because Cityscapes dataset is lack of direct ground truth for depth maps. Consequently, we had to convert disparity maps into ground truth. This conversion results in the image boundaries lacking accurate ground truth data, leading to suboptimal depth estimations in these areas.
</div>

## Discussion and Future work
Our method, while promising, still faces several challenges and areas for improvement. Firstly, our depth estimation branch is relatively weak. This is primarily due to limited computational resources, preventing us from training the entire network from scratch. We only train the depth branch for 10K iterations, resulting in the depth estimation decoder being less trained than other parts of network. This issue sometimes leads to unreliable predicted depth values.

Secondly, the Cityscapes dataset is quite small, encompassing only around 3000 images for training and validation. Furthermore, it lacks high-quality ground truth for depth maps. These limitations undoubtedly affect the accuracy of our depth estimation. In future, I wish to use other more modern and more diverse dataset.

Finally, Panoptic-DeepLab is currently trained with separate losses for depth estimation and segmentation. In the future, we aim to integrate these into a unified task, potentially enhancing the network's performance and efficiency.

## Conclusion
This project showcases the feasibility of merging two seemingly distinct tasks — depth estimation and segmentation — to enhance the ability of image recongnition algorithm. We found that utilizing the same encoded features for both tasks yields satisfactory results. Through visualization, it's evident that our idea is feasible that we can get segment result with with only single image as input. This integration marks a significant step forward in developing more sophisticated and reliable autonomous driving systems.