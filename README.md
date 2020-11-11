# photoDumper

### Read a image file, optionally set its resolution and size and then generate a hex list for each pixel into a simple text file of the same name as the photo filename.

Idea by Andy Allen and coding by Chris Cullen. 

### Version 1 alpha

## Usage

#### This is a command line only program

To execute the program you need to be at the command prompt in your OS of choice.  In Windowd you can get to the command prompt by pressing with [WIN] key + [R] and then entering the command `cmd` and hitting return, in Linux you can simply open the terminal.

For ease, it is recommended that you place the images to process into the same folder as the program, however that is not a requirement of the program.  To dump a image, at the command prompt you need to enter the command as follows:

```bash
dumpImage dump [options] <filename>
```

For example, to dump the contents of the file sample.png use the following command:

```bash
dumpImage sample.png
```

There are a number of options to alter the process applied to the image as follows:

|short|long           |parameter|description|
|:--:|:----------| :--: |--------|
|-f|--format| 1-6     |Write the pixel information in 1 of 6 formats, numbered from 1 to 6 |
|-x|--width| pixels    |Sets the width in pixels of the image.  This will cause dumpImage to resize the image.  If you only specify the width, the height is calculated using the image aspect ratio.|
|-y|--height| pixels  |Sets the height in pixels of the image in the same manner as `width`.|
|-h|--help|             |display help for command |
