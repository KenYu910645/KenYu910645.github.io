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
<div class="row">
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

##  Motivation 
To get the car and person on road though camera is essential for self driving car on road. Especially for depth estimation, the ability to estimate distance to the nearest obstacle can be crucial for autonomous driving vehicle. Despite using active sensor such as LiDAR or camera can get an accurate depth of the object; these sensor are typically too expensive and difficultly to install on cars. Therefore, we want to use a single camera image to find object depth. If we can achieve this task than we can able to use a very cheap sensor to finish a self driving car 

## Monocular 3D object detection

means to detect objects in image and use a cubic to mark the object use single camera image as input. Since we use cuboid to represent an object, we need to predict the object depth along the way. There are nine variable needed to defined, including location, Dimension and orientation. Since most objects on road is parallel to ground , and we really don’t care the pitch and yaw. we can reduce the variable to seven. As shown below.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/intro.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

There is a growing body of literature on monocular 3D object detection, which can be broadly categorized into five groups:

1. 2D Box Based:
The most straightforward method is to crop the object from the input image as a region of interest and then perform 3D detection. This approach tends to be sensitive to the accuracy of the detected 2D bounding box, often leading to poor position accuracy when the 2D bounding box is imprecise. Early research typically resolve to this method.

2. Key Point-Based (Anchor-Free):
Another method involves identifying key points on the image crucial for detecting the 3D bounding box. These methods use these key points to construct the 3D bounding box. Key points are usually centered on the object, using a single point to represent the entire 3D object. This method is fast and simple, making it easy to scale. However, its heavy reliance on key point detection results in lower accuracy, particularly for truncated objects where key points are not visible on the image.

3. Direct Generation of 3D Box:
This approach treats the problem similarly to regressing a 2D bounding box but expands the detection head to accommodate additional variables. It offers good accuracy and usually employs an end-to-end structure.

4. Representation Transformation:
Some researchers argue that using 2D images to represent 3D objects is suboptimal. They propose first converting the 2D image to a 3D space representation, such as a point cloud, and then applying existing 3D object detection methods. This two-stage process—first transforming, then detecting—results in lower efficiency and greater training difficulty. However, converting the image to 3D space improves accuracy, especially in depth axis detection.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/detail_liter.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The literature on monocular 3D object detection is typically divided into four distinct categories. In this project, our focus is specifically on the third approach: the direct generation of 3D bounding boxes.
</div>

## Approach
Our idea is that certain patterns in images, like straight lines that paralled to depth axis, can provide valuable depth-related information. By extracting and utilizing these 'depth-aware' features, we aim to enhance the performance of 3D object detectors. For example, pavement lines in an image, which are typically straight and parallel to the depth axis, can serve as references. Just as humans use these patterns to gauge distance from the camera, we want to endow computer with a similar capability.

To achieve this, we propose a novel approach: skewing the convolutional kernel in the convolution layer to align with the depth axis, rather than maintaining a regular cubic shape. In our experiments, we assume prior knowledge of the scene's perspective, enabling us to effectively skew the convolution kernel. This method, which we call 'Perspective-Aware Convolution' (PAC), will be integrated into existing 3D object detectors. This integration allows us to assess PAC's effectiveness in improving the detection of 3D bounding boxes, comparing its performance before and after implementation.

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
    Our concept revolves around skewing the shape of the convolutional kernel to align with the slope of the depth-axis. This alignment enables the extraction of features along the depth axis. We refer to this method as Perspective-Aware Convolution (PAC).
</div>


We have developed a technique to skew the kernel shape based on the perspective information of the image. A key question we addressed is determining the size of the kernel. To this end, we conducted experiments with various dilation rates to evaluate their impact on 3D object detection performance. Our findings indicate that dilation rates ranging from three to seven generally yield the best results. This experiment is shown below.

<div class="text-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/dialate_rate.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="caption">
        Our experiment shows dialation rate with 3, 5, and 7 yield a better result in 3D object detection.
    </div>
</div>

Building on this, we designed a 'Perspective-Aware Convolution' module, closely resembling the Atrous Spatial Pyramid Pooling (ASPP) module. This module utilizes multiple dilation rates for the kernel size, with each kernel's shape being adjusted to align with the slope of the depth axis, as depicted in the illustration below.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/aspp.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Comparasion of our PAC module and ASPP module
</div>

We strategically placed our specially designed Perspective-Aware Convolution (PAC) module right after the backbone's feature extraction stage. This placement allows us to inject depth-aware information directly into the extracted features. Subsequently, these enhanced features are fed into the detection head, ensuring that all branches of the network benefit from our improvement. The complete network architecture, with our PAC module integration, is depicted in the illustration below.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/network.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Netowrk architecture of our proposed 3D object detector.
</div>

## Experiment 
In this section, we showcase the performance of our PAC module in 3D object detection. We've integrated PAC into the Groundaware baseline network, focusing on enhancing its capabilities. Our training and testing were conducted on the KITTI3D dataset, with 3,711 training and 3,768 validation images, following the data split recommended by Chen et al.

During training, our setup included a batch size of 8 and the Adam optimizer with a learning rate of 0.0001. To increase efficiency, we trimmed the top 100 pixels from images and resized them to 288x1280. We also used horizontal flipping and photometric distortion to enrich the training dataset's diversity.

## Result
In our experiments, we compared the performance of our Perspective-Aware Convolution (PAC) module against other enhanced convolution layers. We found that adding a depth-aware convolution layer significantly improves performance over other methods for neural network enhancement.

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
    Our proposed method also outperform other 3D object detector mentioned in the literature.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/project_pac/last_com.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    With our PAC module, the detector is able to more accuratley capture the farer objects.
</div>

## Conclusion
Our research demonstrates the importance of incorporating depth-related information in 3D object detection. By effectively utilizing or leveraging perspective information, we can significantly enhance a computer's ability to interpret 3D scenes, much like humans do.


