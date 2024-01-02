---
layout: page
title: Perspective-aware Convolution
description: Monocular 3D Object Detection 
img: assets/img/preview/pac_project.jpg
importance: 2
category: Research
giscus_comments: true
related_publications: pac
---

<!-- hyperlink icon(Paper, Slides, Github)  -->
<div class="row" style="margin-bottom: 20px;">
    <div class="col-sm mt-3 mt-md-0 text-center">
        <div class="icon-with-text">
            <a href="{{ 'CVGIP_pac_paper.pdf' | prepend: 'assets/pdf/' | relative_url}}" target="_blank" rel="noopener noreferrer">
            <span class="icon-text h3">Paper</span>
            <i class="fa-solid fa-file-pdf h3"></i></a>
        </div>
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        <div class="icon-with-text">
            <a href="{{ 'CVGIP_pac_ppt.pdf' | prepend: 'assets/pdf/' | relative_url}}" target="_blank" rel="noopener noreferrer">
            <span class="icon-text h3">Slides</span>
            <i class="fa-solid fa-file-pdf h3"></i></a>
        </div>
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        <div class="icon-with-text">
            <a href="https://github.com/KenYu910645/perspective-aware-convolution" target="_blank" rel="noopener noreferrer">
            <span class="icon-text h3">GitHub</span>
            <i class="fa-brands fa-github h3"></i></a>
        </div>
    </div>
</div>

##  Demo Video 
<!-- youtube video  -->
<div class="row justify-content-sm-center">
    <div class="col-sm-12">
        {% include video.html path="https://www.youtube.com/embed/AVMtxJy7pjk" width="770px" height="530px" %}
    </div>
</div>

## Motivation 
It's crucial for self-driving car to preciously estimate nearby car or pedestrain. Despite using active sensor such as LiDAR or camera can get an accurate distance to the object; these sensor are typically too expensive or difficult to install. Therefore, we want to use the prevalent sensor: camera to predict 3D object in autonomous driving scene

## Introduction - Monocular 3D Object Detection
Monocular 3D Object Detection means using single image to detect 3D objects, which is defined by cuboids. For a cuboid, there are nine variable needed to defined, including object location (x, y, z), dimension (w, h, l) and orientation (roll, pitch, yaw). Since most objects on road is parallel to ground, we can ignore pitch and yaw angle, reducing the variables that needed to regress down to seven.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/intro.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Currently, most work can be categorized into five approaches:

1. Base on 2D Boxes :
The most straightforward method is to crop the object from the input image as a region of interest and then detect 3D box geometry based on the feature inside RoI. This approach tends to be sensitive to the accuracy of the detected 2D bounding box, often leading to poor accuracy. Only early research tend to use this approach.

2. Key Point-Based (Anchor-Free):
Another method involves identifying key points on the image crucial for detecting the 3D bounding box. These methods use these key points to construct the 3D bounding box. Key points are usually object center or its 3D box corners. This method is fast and simple, making it easy to scale. However, its heavy reliance on key point detection results in lower accuracy, particularly for truncated objects where key points are not visible on the image.

3. Direct Generation of 3D Box (Anchor-based):
This approach treats the problem similarly to regressing a 2D bounding box but expands the detection head to accommodate additional variables. It offers good accuracy and usually employs an end-to-end structure.

4. Representation Transformation:
Some researchers argue that finding 3D object in 2D images is a suboptimal. They propose first converting the 2D image to a 3D space representation, such as a point cloud or Bird-eye-view plane, and then applying existing 3D object detection methods on it. This two-stage transform—first detect—later results in high accuracy especially for far objects. However, due to its cumbersome architecutre, it's hard to train

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/detail_liter.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Work in Monocular 3D object detection can be divided into four distinct categories. In this project, our focus is specifically on the third approach: the direct generation of 3D bounding boxes.
</div>

## Approach
To improve 3D obejct detector, our idea is to endow the network with ability to recongize depth-related patterns in images, such like straight lines on pavement and landmark. We believe these line that paralled to depth-axis can serve as references when predicting object depth.

To achieve this, we propose a novel convolutional layer: skewing the convolutional kernel in the convolution layer to align with the slope of depth axis, rather than maintaining a regular cubic shape. In our experiments, we assume prior knowledge of the scene's perspective, enabling us to effectively skew the convolution kernel. This method, which we call 'Perspective-Aware Convolution' (PAC), will be integrated into existing 3D object detectors. This integration allows us to assess PAC's effectiveness in improving the detection of 3D bounding boxes, comparing its performance before and after implementation.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/explain.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    When evaluating the depth of a green point in an image, our visual system intuitively utilizes additional information along the same depth axis. This capability stems from our understanding of the 3D structure of the scene. Features like red dots on this axis can aid in accurately predicting the depth of the green dot.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/pac_explain.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Our PAC skewing the shape of the convolutional kernel to align with the slope of the depth-axis. This alignment enables the extraction of features along the depth axis. We refer to this method as Perspective-Aware Convolution (PAC).
</div>

Apart from kernel shape, we also want to find the best kernel size for our network. To this end, we conducted experiments with various dilation rates to evaluate their performance in 3D object detection. Our findings indicate that dilation rates ranging from three to seven generally yield the best results.

<div class="text-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/dialate_rate.png" title="example image" class="img-fluid rounded z-depth-1" width="400px" %}
    </div>
    <div class="caption">
        Our experiment shows dialation rate with 3, 5, and 7 yield a better result in 3D object detection.
    </div>
</div>

Building on these discover, we designed a 'Perspective-Aware Convolution' module, closely resembling the Atrous Spatial Pyramid Pooling (ASPP) module. This module utilizes multiple dilation rates for the kernel size, with each kernel's shape being adjusted to align with the slope of the depth axis, as depicted in the illustration below.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/aspp.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Comparasion of our PAC module and ASPP module
</div>

We placed our Perspective-Aware Convolution (PAC) module right after the backbone's feature extraction stage. This adjustment allows us to inject depth-aware information directly into the extracted features. Subsequently, these enhanced features are fed into the detection head, ensuring that all branches can benefit from it.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/network.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Netowrk architecture of our proposed 3D object detector.
</div>

## Experiment 
In this section, we showcase the performance of our PAC module in monocular 3D object detection. We integrated PAC into the Ground-aware  network as baseline. Our training and testing were conducted on the KITTI3D dataset, with 3,711 training and 3,768 validation images.

During training, our setup included a batch size of 8 and the Adam optimizer with a learning rate of 0.0001. To increase efficiency, we trimmed the top 100 pixels from images and resized them to 288x1280. We also used horizontal flipping and photometric distortion to enrich the training dataset's diversity.

## Result
In our experiments, we compared the performance of our Perspective-Aware Convolution (PAC) module against other enhanced convolution layers. We found that adding PAC significantly improves performance over other methods for neural network enhancement.

Additionally, we tested the impact of integrating the PAC module into three different 3D detectors. The results were promising: our PAC module enabled these detectors to outperform many existing models in the field.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/result.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Our PAC module outperforms other enhancements of convolutional layers, owing to its unique ability to incorporate perspective information into the network.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/result_liter.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Our proposed method also outperform other monocular 3D object detector mentioned in the literature.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/last_com.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    With our PAC module, the detector is able to capture farer objects more accuratley .
</div>

## Conclusion
Our research demonstrates the importance of incorporating depth-related information in monocular 3D object detection. By effectively utilizing or leveraging perspective information, we can significantly enhance a computer's ability to interpret 3D scenes.
