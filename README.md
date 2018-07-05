# Resnet50 native module for Node.js

| My experiments with pytorch glow

## Compiling Glow

For more detailed info see the [glow documentation](https://github.com/pytorch/glow) found here.

- download glow:

  ```sh
  git clone https://github.com/pytorch/glow.git
  cd glow
  git submodule update --init --recursive
  ```

- build glow:

  ```sh
  mkdir build_Release && cd $_
  cmake -G Ninja .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_PREFIX_PATH=/usr/local/opt/llvm
  ninja all
  ```

  Note: You might need to install some dependencies (see main docs).

## Creating a bundle to use in our node module

Detailed [glow documentation for standalone executable bundles](https://github.com/pytorch/glow/blob/master/docs/AOT.md) found here.

- getting the resnet50 model:

  ```sh
  ../utils/download_caffe2_models.sh
  ```
  
  This is probably the easiest way but it will take a while since it downloads a lot more than just the resnet50 model.
  If you want just the resnet model then open up the file above and run the specific wget commands...

  ```sh
  wget -nc http://fb-glow-assets.s3.amazonaws.com/models/resnet50/predict_net.pbtxt -P resnet50
  wget -nc http://fb-glow-assets.s3.amazonaws.com/models/resnet50/predict_net.pb -P resnet50
  wget -nc http://fb-glow-assets.s3.amazonaws.com/models/resnet50/init_net.pb -P resnet50
  ```

  Even this may still take a while since the `init_net.pb` file is ~120M in size.

- getting sample image:

  ```sh
  ls ../tests/images/imagenet
  ```

  There are several in the tests dir however any 224x224 png image should work.

- creating the bundle:

  ```sh
  mkdir bundle
  ./bin/image-classifier ../tests/images/imagenet/dog_207.png \
    -image_mode=0to1 -m resnet50 -cpu -emit-bundle bundle -g
  ```

And now we should have our object and weights files to be used in our node module.  The `bundle/resnet50.o` and `bundle/resnet50.weights` should be pretty much the same as the files currently in the `lib` dir.
