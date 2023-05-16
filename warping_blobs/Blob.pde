class Blob{
    float x, y, w, h;
    String type;
    PImage blobImg;
    Blob(float _x, float _y, String _type){
        x = _x;
        y = _y;
        type = _type;
        if(_type == "small"){
            blobImg = blobSmall;
        }else{
            blobImg = blobBig;
        }
        w = blobImg.width;
        h = blobImg.height;
    }

    void display(){
        image(blobImg, x, y, w, h);
    }



}