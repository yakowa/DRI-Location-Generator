![JacobEM](https://jacobem.com/assets/media/JacobEM.png)


# DRI Location Generator

This DRI Location Generator is an efficient and simple solution for ingests to the [The Digital Repository of Ireland (DRI)](https://www.dri.ie/).

This application uses the Google Maps API, Logainm API and the GeoNames API for accurate and correct XML that can save loads of time when formatting  DRI ingests.


![Version: 5.1.0](https://img.shields.io/badge/Version-5.1.0-00e0a7)

![License: MIT](https://img.shields.io/badge/License-MIT-776bff)

## Documentation


### How to use

#### Step 1: Open The App

Go to [https://jacobem.com/app/dri-location/](https://jacobem.com/app/dri-location/)!

Alternatively, you can download the files and open `index.html` in your browser:

##### Download

Go to the [GitHub Page](https://github.com/yakowa/Omeka-Title-Desc-Extractor) and click the green `Code` button, then navigate to the `Download ZIP` button. This will download the application in a compressed folder. Simply right-click this folder and select `Extract All`.

##### Clone The Repository

If you have [Git](https://git-scm.com/) you may use Git Bash to clone the repository.

Simply run:
```bash
git clone https://github.com/yakowa/Omeka-Title-Desc-Extractor
```

#### Step 2: Select Region Or City

On the right-hand panel, select either region or city. This impacts the resulting XML in the following ways:

##### City Mode

The resulting XML contains `name`, `north` and `east`.

Example:
```xml
<dcterms:spatial>name=Cork; north=53.644106944990966; east=-6.053272637606177;</dcterms:spatial>
```

##### Region Mode

The resulting XML contains `name`, `north`, `south`, `east`, `west`.

Example:
```xml
<dcterms:spatial>name=Ireland; northlimit=55.41184958673504; eastlimit=-5.405079278231177; southlimit=51.40071392344133; westlimit=-10.692642816585822;</dcterms:spatial>
```

#### Step 3: Enter Relevant Region

Enter the relevant region that you are wanting to specify.

Example: `Cork City`

Example: `Dublin, Ireland`

Example: `London`

#### Step 4: Move Box to Desired Location

Drag, move or resize the rectangular box to highlight the region you are wanting to select. For Example; selecting a rectangular region around Dublin.

#### Step 5: Copy The XML Code

Found under the output heading you can find XML output containing the dcterms:spatial XML [see](#step-2-select-region-or-city), GeoNames Infomation (based on the co-ords of the selection) and data from logainm.ie, [see](#step-3-enter-relevant-region).

To copy the XML output simply click the `Copy Code` button.

## What I learned

Before building this application I had never attempted to build anything to do with geolocation, so during the creation of this app, I've learned a lot!

- I have learned how to use the Google Maps JavaScript API and how to draw resizeable, movable rectangles onto Google Maps.
- While creating the app I learned how to update a rectangle's location and size as well as the Google Maps viewport location and zoom.
- I now know how to make a more efficient API wrapper that has multiple GET request variables using the file_get_contents and the http_build_query PHP function.

## Acknowledgements

Created by [JacobEM.com](JacobEM.com).

Thank you very much to [Patrick](https://www.patrickegan.org) for helping make the application and being very easy to work with.

## License

Licensed under the MIT license:

Copyright 2021 JacobEM

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.