function Rotate(e,a,r,t){var n,i,o=[]
switch(t){case 90:for(n=0;n<4*a;n+=4)for(i=4*a*(r-1);i>=0;i-=4*a)o.push(e[n+i]),o.push(e[n+i+1]),o.push(e[n+i+2]),o.push(e[n+i+3])
break
case-90:for(n=4*a-4;n>=0;n-=4)for(i=0;i<e.length;i+=4*a)o.push(e[n+i]),o.push(e[n+i+1]),o.push(e[n+i+2]),o.push(e[n+i+3])
break
case 180:for(i=4*a*(r-1);i>=0;i-=4*a)for(n=4*a-4;n>=0;n-=4)o.push(e[n+i]),o.push(e[n+i+1]),o.push(e[n+i+2]),o.push(e[n+i+3])}return new Uint8ClampedArray(o)}function BoxFilter(e,a,r){var t,n,i,o,c=[],h=[]
for(n=0;n<a;n++)for(c.push([]),h.push(0),i=0;i<(r+1)*a;i+=a)c[c.length-1].push(e[n+i]),h[h.length-1]=h[h.length-1]+e[n+i]
var l=[]
for(i=0;i<e.length;i+=a){for(n=0;n<a;n++){var g=0,u=0
for(o=n;o>=0&&(g+=h[o],++u!==r+1);o--);var f=0
for(o=n+1;o<a&&(g+=h[o],u++,++f!==r);o++);g/=u*=c[0].length,l.push(g)}if(i-r*a>=0)for(o=0;o<c.length;o++)t=c[o].shift(),h[o]=h[o]-t
if(i+(r+1)*a<e.length)for(o=0;o<c.length;o++)t=e[o+i+(r+1)*a],c[o].push(t),h[o]=h[o]+t}return l}function Scale(e,a,r){var t,n,i=[]
for(n=0;n<e.length;n+=8*a)for(t=0;t<4*a;t+=8){var o=(e[n+t]+e[n+t+4]+e[n+4*a+t]+e[n+4*a+t+4])/4
i.push(o)
var c=(e[n+t+1]+e[n+t+4+1]+e[n+4*a+t+1]+e[n+4*a+t+4+1])/4
i.push(c)
var h=(e[n+t+2]+e[n+t+4+2]+e[n+4*a+t+2]+e[n+4*a+t+4+2])/4
i.push(h),i.push(255)}return new Uint8ClampedArray(i)}function IntensityGradient(e,a){var r,t,n,i=[],o=Number.MIN_VALUE,c=Number.MAX_VALUE
for(t=0;t<e.length;t+=4*a)for(r=0;r<4*a;r+=4){var h=0,l=0
for(n=1;n<2;n++)r+4*n<4*a&&(h+=Math.abs(e[t+r]-e[t+r+4*n])),t+4*a*n<e.length&&(l+=l+Math.abs(e[t+r]-e[t+r+4*a*n]))
var g=h-l
o=g>o?g:o,c=g<c?g:c,i.push(g)}if(c<0){for(n=0;n<i.length;n++)i[n]=i[n]-c
c=0}return i}function greyScale(e){var a
for(a=0;a<e.length;a+=4){var r=0,t=255
r=e[a]>r?e[a]:r,r=e[a+1]>r?e[a+1]:r,r=e[a+2]>r?e[a+2]:r,t=e[a]<t?e[a]:t,t=e[a+1]<t?e[a+1]:t,t=e[a+2]<t?e[a+2]:t,e[a]=e[a+1]=e[a+2]=(r+t)/2}}function histogram(e){var a,r=[]
for(a=0;a<256;a++)r[a]=0
for(a=0;a<e.length;a+=4)r[e[a]]=r[e[a]]+1
return r}function otsu(e,a){var r,t=0
for(r=1;r<e.length;++r)t+=r*e[r]
var n,i,o=0,c=0,h=0,l=0,g=0,u=0,f=0
for(r=0;r<e.length;++r)if(0!==(c+=e[r])){if(0==(h=a-c))break
n=(o+=r*e[r])/c,i=(t-o)/h,(g=c*h*Math.pow(n-i,2))>=l&&(u=r,g>l&&(f=r),l=g)}return(u+f)/2}function CreateImageData(){Image.data=new Uint8ClampedArray(Image.width*Image.height*4)
var e,a,r
for(r=0;r<Image.height;r++)for(a=0;a<Image.width;a++)e=4*r*Image.width,Image.data[e+4*a]=Image.table[a][r][0],Image.data[e+4*a+1]=Image.table[a][r][1],Image.data[e+4*a+2]=Image.table[a][r][2],Image.data[e+4*a+3]=Image.table[a][r][3]}function CreateScanImageData(){ScanImage.data=new Uint8ClampedArray(ScanImage.width*ScanImage.height*4)
var e,a,r
for(r=0;r<ScanImage.height;r++)for(a=0;a<ScanImage.width;a++)e=4*r*ScanImage.width,ScanImage.data[e+4*a]=ScanImage.table[a][r][0],ScanImage.data[e+4*a+1]=ScanImage.table[a][r][1],ScanImage.data[e+4*a+2]=ScanImage.table[a][r][2],ScanImage.data[e+4*a+3]=ScanImage.table[a][r][3]}function CreateTable(){Image.table=[]
var e,a,r=[]
for(e=0;e<4*Image.width;e+=4){for(r=[],a=e;a<Image.data.length;a+=4*Image.width)r.push([Image.data[a],Image.data[a+1],Image.data[a+2],Image.data[a+3]])
Image.table.push(r)}}function CreateScanTable(){ScanImage.table=[]
var e,a,r=[]
for(e=0;e<4*ScanImage.width;e+=4){for(r=[],a=e;a<ScanImage.data.length;a+=4*ScanImage.width)r.push([ScanImage.data[a],ScanImage.data[a+1],ScanImage.data[a+2],ScanImage.data[a+3]])
ScanImage.table.push(r)}}function EnlargeTable(e,a){var r,t,n,i=[]
for(r=0;r<Image.width;r++){for(i=[],t=0;t<Image.height;t++)for(n=0;n<e;n++)i.push(Image.table[r][t])
Image.table[r]=i.slice()}for(i=Image.table.slice(),r=0;r<Image.width;r++)for(n=0;n<a;n++)Image.table[r*a+n]=i[r].slice()
Image.width=Image.table.length,Image.height=Image.table[0].length,CreateImageData()}function ScaleHeight(e){var a,r,t,n=[],i=0,o=0,c=0
for(a=0;a<Image.height-e;a+=e)for(r=0;r<Image.width;r++){for(i=0,o=0,c=0,t=a;t<a+e;t++)i+=Image.table[r][t][0],o+=Image.table[r][t][1],c+=Image.table[r][t][2]
n.push(i/e),n.push(o/e),n.push(c/e),n.push(255)}return new Uint8ClampedArray(n)}function Intersects(e,a){return e[0][0]<=a[0][1]&&a[0][0]<=e[0][1]&&e[1][0]<=a[1][1]&&a[1][0]<=e[1][1]}function maxLocalization(e,a,r){var t,n,i,o=e,c=[]
do{var h=a%Image.width,l=(a-h)/Image.width,g=0,u=Image.height,f=0,d=Image.width-1
for(n=l;n<Image.height-1;n++)if(0===Image.table[h][n+1][0]){u=n
break}for(n=l;n>0;n--)if(0===Image.table[h][n-1][0]){g=n
break}for(t=h;t<Image.width-1;t++)if(0===Image.table[t+1][l][0]){d=t
break}for(t=h;t>0;t--)if(0===Image.table[t-1][l][0]){f=t
break}for(n=g*Image.width;n<=u*Image.width;n+=Image.width)for(t=f;t<=d;t++)r[n+t]=0
var s=[[f,d],[g,u]]
for(i=0;i<c.length;i++)if(Intersects(s,c[i])){if(c[i][0][1]-c[i][0][0]>s[0][1]-s[0][0]){c[i][0][0]=c[i][0][0]<s[0][0]?c[i][0][0]:s[0][0],c[i][0][1]=c[i][0][1]>s[0][1]?c[i][0][1]:s[0][1],s=[]
break}c[i][0][0]=c[i][0][0]<s[0][0]?c[i][0][0]:s[0][0],c[i][0][1]=c[i][0][1]>s[0][1]?c[i][0][1]:s[0][1],c[i][1][0]=s[1][0],c[i][1][1]=s[1][1],s=[]
break}s.length>0&&c.push(s),e=0,a=0
for(i=0;i<r.length;i++)r[i]>e&&(e=r[i],a=i)}while(e>.7*o)
return c}function ImgProcessing(){greyScale(Image.data)
var e,a,r,t=IntensityGradient(Image.data,Image.width),n=(t=BoxFilter(t,Image.width,15))[0]
for(e=1;e<t.length;e++)n=n>t[e]?t[e]:n
var i=0,o=0,c=0
for(e=0;e<t.length;e++)t[e]=Math.round(t[e]-n),c+=t[e],i<t[e]&&(i=t[e],o=e)
if((c/=t.length)<15){for(n=(t=BoxFilter(t,Image.width,8))[0],e=1;e<t.length;e++)n=n>t[e]?t[e]:n
for(i=0,o=0,e=0;e<t.length;e++)t[e]=Math.round(t[e]-n),i<t[e]&&(i=t[e],o=e)}var h=[]
for(e=0;e<=i;e++)h[e]=0
for(e=0;e<t.length;e++)h[t[e]]=h[t[e]]+1
var l=otsu(h,t.length)
for(e=0;e<t.length;e++)t[e]<l?Image.data[4*e]=Image.data[4*e+1]=Image.data[4*e+2]=0:Image.data[4*e]=Image.data[4*e+1]=Image.data[4*e+2]=255
CreateTable()
var g=maxLocalization(i,o,t),u=[]
for(e=0;e<g.length;e++)u.push({x:g[e][0][0],y:g[e][1][0],width:g[e][0][1]-g[e][0][0],height:g[e][1][1]-g[e][1][0]})
for(u.length>0&&postMessage({result:u,success:"localization"}),allTables=[],e=0;e<g.length;e++){var f=[]
for(a=2*g[e][0][0];a<2*g[e][0][1];a++){var d=[]
for(r=2*g[e][1][0];r<2*g[e][1][1];r++)d.push([ScanImage.table[a][r][0],ScanImage.table[a][r][1],ScanImage.table[a][r][2],255])
f.push(d)}f.length<1||(Image.table=f,Image.width=f.length,Image.height=f[0].length,CreateImageData(),allTables.push({table:f,data:new Uint8ClampedArray(Image.data),width:Image.width,height:Image.height}))}}function showImage(e,a,r){postMessage({result:e,width:a,height:r,success:"image"})}function Main(){ImgProcessing()
var e,a,r,t,n,i,o,c=[]
for(i=0;i<allTables.length;i++){Image=allTables[i]
var h,l=ScaleHeight(30),g=0,u="",f={},d=[]
Selection=!1
do{for(a=l.subarray(g,g+4*Image.width),r=[],o=0;o<256;o++)r[o]=0
for(o=0;o<a.length;o+=4)r[t=Math.round((a[o]+a[o+1]+a[o+2])/3)]=r[t]+1
h=yStraighten(a,(n=otsu(r,a.length/4))<41?1:n-40,n>214?254:n+40),Selection=BinaryString(h),Selection.string?(u=Selection.format,e=Selection,Selection=Selection.string,"EAN-13"===u&&(void 0===f[Selection]?(f[Selection]={count:1,correction:e.correction},d.push(Selection)):(f[Selection].count=f[Selection].count+1,f[Selection].correction=f[Selection].correction+e.correction),Selection=!1)):Selection=!1,g+=4*Image.width}while(!Selection&&g<l.length)
if(Selection&&"EAN-13"!==u&&c.push({Format:u,Value:Selection}),"EAN-13"===u&&(Selection=!1),!Selection){EnlargeTable(4,2),g=0,l=ScaleHeight(20)
do{for(a=l.subarray(g,g+4*Image.width),r=[],o=0;o<256;o++)r[o]=0
for(o=0;o<a.length;o+=4)r[t=Math.round((a[o]+a[o+1]+a[o+2])/3)]=r[t]+1
h=yStraighten(a,(n=otsu(r,a.length/4))<40?0:n-40,n>215?255:n+40),Selection=BinaryString(h),Selection.string?(u=Selection.format,e=Selection,Selection=Selection.string,"EAN-13"===u&&(void 0===f[Selection]?(f[Selection]={count:1,correction:e.correction},d.push(Selection)):(f[Selection].count=f[Selection].count+1,f[Selection].correction=f[Selection].correction+e.correction),Selection=!1)):Selection=!1,g+=4*Image.width}while(!Selection&&g<l.length)
if("EAN-13"===u){var s={}
for(var C in f){f[C].correction=f[C].correction/f[C].count
var v=f[C].correction
v-=f[C].count,v+=d.indexOf(C),s[C]=v}var m=Number.POSITIVE_INFINITY,I=""
for(var A in s)s[A]<m&&(m=s[A],I=C)
Selection=m<11&&I}Selection&&c.push({Format:u,Value:Selection})}if(c.length>0&&!Multiple)break}return c}function yStraighten(e,a,r){var t,n,i,o=0,c=new Uint8ClampedArray(Image.width*(r-a+1)*4)
for(n=0;n<c.length;n++)c[n]=255
for(n=0;n<4*Image.width;n+=4)for(t=r,o=(e[n]+e[n+1]+e[n+2])/3,n<4*Image.width-4&&(o+=(e[n+4]+e[n+5]+e[n+6])/3,o/=2),i=n;i<c.length;i+=4*Image.width)o<t&&(c[i]=c[i+1]=c[i+2]=0),t--
return c}function CheckEan13(e,a){if(a){if(5!==e.length)return!1}else if(3!==e.length)return!1
var r,t=0
for(r=0;r<e.length;r++)t+=e[r]
for(t/=e.length,r=0;r<e.length;r++)if(e[r]/t<.5||e[r]/t>1.5)return!1
return!0}function TwoOfFiveStartEnd(e,a){if(e.length<5||e.length>6)return!1
var r,t=0,n=[0,0]
for(r=0;r<e.length;r++)e[r]>t&&(t=e[r],n[0]=r)
for(t=0,r=0;r<e.length;r++)r!==n[0]&&e[r]>t&&(t=e[r],n[1]=r)
return n[0]+n[1]===2}function CheckInterleaved(e,a){var r,t=0
for(r=0;r<e.length;r++)t+=e[r]
if(t/=4,a){if(4!==e.length)return!1
for(r=0;r<e.length;r++)if(e[r]/t<.5||e[r]/t>1.5)return!1
return!0}if(3!==e.length)return!1
var n,i=0
for(r=0;r<e.length;r++)e[r]>i&&(i=e[r],n=r)
if(0!==n)return!1
if(e[0]/t<1.5||e[0]/t>2.5)return!1
for(r=1;r<e.length;r++)if(e[r]/t<.5||e[r]/t>1.5)return!1
return!0}function BinaryConfiguration(e,a){var r,t,n,i=[],o=[],c=0
if("Code128"===a||"Code93"===a){for(t=6,r=e[0],"Code128"===a&&(r/=2),n=0;n<e.length;n++)if(e[n]>6*r){e.splice(n,e.length)
break}do{7===e.length&&"Code128"===a?i.push(e.splice(0,e.length)):i.push(e.splice(0,t)),"Code93"===a&&e.length<6&&e.splice(0,t)}while(e.length>0)}if("Code39"===a){for(t=9,r=e[0],n=0;n<e.length;n++)if(e[n]>5*r){e.splice(n,e.length)
break}do{i.push(e.splice(0,t)),e.splice(0,1)}while(e.length>0)}if("EAN-13"===a){t=4,r=e[0]
var h=0
for(n=0;n<e.length;n++)if(e[n]>6*r){e.splice(n,e.length)
break}CheckEan13(e.splice(0,3),!1)&&h++,c=0
do{i.push(e.splice(0,t)),6===++c&&CheckEan13(e.splice(0,5),!0)&&h++}while(i.length<12&&e.length>0)
if(CheckEan13(e.splice(0,3),!1)&&h++,h<2)return[]}if("2Of5"===a){for(t=5,r=e[0]/2,n=0;n<e.length;n++)if(e[n]>5*r){e.splice(n,e.length)
break}var l=e.splice(0,6)
i.push(l)
do{for(o=[],n=0;n<t;n++)o.push(e.splice(0,1)[0])
i.push(o),5===e.length&&i.push(e.splice(0,5))}while(e.length>0)}if("Inter2Of5"===a){for(t=5,r=e[0],n=0;n<e.length;n++)if(e[n]>5*r){e.splice(n,e.length)
break}i.push(e.splice(0,4))
var g=[]
do{for(o=[],g=[],n=0;n<t;n++)o.push(e.splice(0,1)[0]),g.push(e.splice(0,1)[0])
i.push(o),i.push(g),3===e.length&&i.push(e.splice(0,3))}while(e.length>0)}if("Codabar"===a){for(t=7,r=e[0],n=0;n<e.length;n++)if(e[n]>5*r){e.splice(n,e.length)
break}do{i.push(e.splice(0,t)),e.splice(0,1)}while(e.length>0)}return i}function BinaryString(e,a){var r,t,n,i,o=[],c=[],h=255,l=0
for(n=0;n<e.length-4*Image.width;n+=4*Image.width){var g=e.subarray(n,n+4*Image.width)
for(o=[],i=0;255===g[i];)i+=4
for(;i<g.length;){for(l=0,h=g[i];g[i]===h&&i<g.length;)l++,i+=4
o.push(l)}o.length>2&&o[0]<=o[1]/10&&o.splice(0,2)
var u=o.slice(),f=!1
for(i=0;i<FormatPriority.length;i++){var d,s
if(o=BinaryConfiguration(o=u.slice(),FormatPriority[i]),"2Of5"!==FormatPriority[i]&&"Inter2Of5"!==FormatPriority[i]||(d=o.splice(0,1)[0],s=o.splice(o.length-1,1)[0]),c=Distribution(o,FormatPriority[i]),"EAN-13"===FormatPriority[i]?(o=c.data,corrections=c.correction):o=c,void 0!==o){if(o.length>4||"Code39"===FormatPriority[i]&&o.length>2)if("Code128"===FormatPriority[i])CheckCode128(o)&&(o=DecodeCode128(o),f=!0)
else if("Code93"===FormatPriority[i])CheckCode93(o)&&(o=DecodeCode93(o),f=!0)
else if("Code39"===FormatPriority[i])CheckCode39(o)&&(o=DecodeCode39(o),f=!0)
else if("EAN-13"===FormatPriority[i])(t=DecodeEAN13(o))&&13===t.length&&(o=t,f=!0)
else if("2Of5"===FormatPriority[i]||"Inter2Of5"===FormatPriority[i]){if("2Of5"===FormatPriority[i]){if(void 0!==d&&!TwoOfFiveStartEnd(d,!0))continue
if(void 0!==s&&!TwoOfFiveStartEnd(s,!1))continue}if("Inter2Of5"===FormatPriority[i]){if(void 0!==d&&!CheckInterleaved(d,!0))continue
if(void 0!==s&&!CheckInterleaved(s,!1))continue}(t=Decode2Of5(o))&&(o=t,f=!0)}else"Codabar"===FormatPriority[i]&&(t=DecodeCodaBar(o))&&(o=t,f=!0)
if(f){"Inter2Of5"===(r=FormatPriority[i])&&(r="Interleaved 2 of 5"),"2Of5"===r&&(r="Standard 2 of 5")
break}}}if(f)break}return"Code128"===r?"string"==typeof o.string?o:{string:!1}:"string"==typeof o?"EAN-13"===r?{string:o,format:r,correction:corrections}:{string:o,format:r}:{string:!1}}function Distribution(e,a){var r,t,n,i,o,c,h,l,g,u,f,d,s,C=0,v=[]
for(0===(a=availableFormats.indexOf(a))?(t=11,r=6,n=4):1===a?(t=9,r=6,n=4):2===a?(t=12,r=9):3===a&&7===e.length?(t=4,r=2,n=2):3===a?(t=7,r=4,n=4):6===a&&(r=7),i=0;i<e.length;i++){var m=e[i],I=0,A=0,B=[]
if(6!==a)if(4!==a&&5!==a){for(;A<r;)I+=m[A],A++
if(2!==a)if(3!==a){for(A=0;A<r;)B.push(m[A]/I*t),A++
for(A=0;A<r;)B[A]=B[A]>n?n:B[A],B[A]=B[A]<1?1:B[A],B[A]=Math.round(B[A]),A++
if(3===a){var S=0
for(o=0;o<B.length;o++)S+=B[o]
if(S>7){s=0
var p=0
for(o=0;o<B.length;o++)B[o]>s&&(s=B[o],p=o)
B[p]=s-(S-7)}}if(3===a)for(o=0;o<B.length;o++)C+=Math.abs(B[o]-m[o]/I*t)
v.push(B)}else{for(s=[[0,0],[0,0],[0,0]],c=0;c<m.length;c++)m[c]>s[0][0]&&(s[0][0]=m[c],f=s[0][1],s[0][1]=c,c=f),m[c]>s[1][0]&&c!==s[0][1]&&(s[1][0]=m[c],f=s[1][1],s[1][1]=c,c=f),m[c]>s[2][0]&&c!==s[0][1]&&c!==s[1][1]&&(s[2][0]=m[c],s[2][1]=c)
if(s[0][0]/s[1][0]>=3){for(u=0,c=0;c<m.length;c++)c!==s[0][1]&&(u+=m[c])
for(u/=3,c=0;c<m.length;c++)if(c!==s[0][1]&&(m[c]/u<.02||m[c]/u>3))return{data:[],correction:0}
if(s[0][0]/u<2.2||s[0][0]/u>6)return{data:[],correction:0}
for(c=0;c<m.length;c++)c===s[0][1]?B.push(4):B.push(1)
v.push(B)}else if(s[0][0]/s[2][0]>2){if(g=s[0][0]+s[1][0],g/=5,s[0][0]/(3*g)<.02||s[0][0]/(3*g)>3)return{data:[],correction:0}
if(s[1][0]/(2*g)<.02||s[1][0]/(2*g)>3)return{data:[],correction:0}
for(u=0,c=0;c<m.length;c++)c!==s[0][1]&&c!==s[1][1]&&(u+=m[c])
for(u/=2,c=0;c<m.length;c++)if(c!==s[0][1]&&c!==s[1][1]&&(m[c]/u<.02||m[c]/u>3))return{data:[],correction:0}
for(c=0;c<m.length;c++)c===s[0][1]?B.push(3):c===s[1][1]?B.push(2):B.push(1)
v.push(B)}else{if(s[0][1]%2==s[1][1]%2&&s[0][1]%2==s[2][1]%2){var E=s[0][1]%2
for(s[2]=[0,0],c=0;c<m.length;c++)c%2!==E&&m[c]>s[2][0]&&(s[2][0]=m[c],s[2][1]=c)}for(g=s[0][0]+s[1][0]+s[2][0],g/=3,c=0;c<s.length;c++)if(s[c][0]/g<.02||s[c][0]/g>3)return{data:[],correction:0}
var b=0
for(c=0;c<m.length;c++)c!==s[0][1]&&c!==s[1][1]&&c!==s[2][1]&&(b=m[c])
if(g/b<.02||g/b>3)return{data:[],correction:0}
for(c=0;c<m.length;c++)c===s[0][1]||c===s[1][1]||c===s[2][1]?B.push(2):B.push(1)
v.push(B)}for(c=0;c<B.length;c++)C+=Math.abs(B[c]-m[c]/I*t)}else{for(h=[[0,0],[0,0]],l=[0,0],c=0;c<m.length;c++)c%2==0?(m[c]>h[0][0]&&(h[0][0]=m[c],f=h[0][1],h[0][1]=c,c=f),m[c]>h[1][0]&&c!==h[0][1]&&(h[1][0]=m[c],h[1][1]=c)):m[c]>l[0]&&(l[0]=m[c],l[1]=c)
if(l[0]/h[0][0]>1.5&&l[0]/h[1][0]>1.5)for(h=[[0,0],[0,0]],c=0;c<m.length;c++)c%2!=0&&(m[c]>h[0][0]&&c!==l[1]&&(h[0][0]=m[c],f=h[0][1],h[0][1]=c,c=f),m[c]>h[1][0]&&c!==h[0][1]&&c!==l[1]&&(h[1][0]=m[c],h[1][1]=c))
if(g=h[0][0]+h[1][0]+l[0],g/=3,h[0][0]/g>1.6||h[0][0]/g<.4)return[]
if(h[1][0]/g>1.6||h[1][0]/g<.4)return[]
if(l[0]/g>1.6||l[0]/g<.4)return[]
for(u=0,o=0;o<m.length;o++)o!==h[0][1]&&o!==h[1][1]&&o!==l[1]&&(u+=m[o])
for(u/=6,o=0;o<m.length;o++)if(o!==h[0][1]&&o!==h[1][1]&&o!==l[1]&&(m[o]/u>1.6||m[o]/u<.4))return[]
for(c=0;c<m.length;c++)c===h[0][1]||c===h[1][1]||c===l[1]?B.push(2):B.push(1)
v.push(B)}}else{for(s=[[0,0],[0,0]],o=0;o<m.length;o++){if(!isFinite(m[o]))return[]
m[o]>s[0][0]&&(s[0][0]=m[o],f=s[0][1],s[0][1]=o,o=f-1),m[o]>s[1][0]&&o!==s[0][1]&&(s[1][0]=m[o],s[1][1]=o)}if(Secure2Of5){if(g=s[0][0]+s[1][0],g/=2,s[0][0]/g>1.3||s[0][0]/g<.7)return[]
if(s[1][0]/g>1.3||s[1][0]/g<.7)return[]
for(u=0,o=0;o<m.length;o++)o!==s[0][1]&&o!==s[1][1]&&(u+=m[o])
for(u/=3,o=0;o<m.length;o++)if(o!==s[0][1]&&o!==s[1][1]&&(m[o]/u>1.3||m[o]/u<.7))return[]}for(o=0;o<m.length;o++)o!==s[0][1]&&o!==s[1][1]?B.push(0):B.push(1)
v.push(B)}else{if(7!==m.length)return[]
if(0===i||i===e.length-1){for(l=[[0,0],[0,0]],h=[0,0],o=0;o<m.length;o++)if(o%2==0)m[o]>h[0]&&(h[0]=m[o],h[1]=o)
else{if(m[o]>l[0][0]){l[0][0]=m[o],f=l[0][1],l[0][1]=o,o=f-1
continue}m[o]>l[1][0]&&o!==l[0][1]&&(l[1][0]=m[o],l[1][1]=o)}if(SecureCodabar){for(g=l[0][0]+l[1][0]+h[0],g/=3,d=[l[0][0],l[1][0],h[0]],o=0;o<d.length;o++)if(d[o]/g>1.5||d[o]/g<.5)return[]
for(u=0,o=0;o<m.length;o++)o!==h[1]&&o!==l[0][1]&&o!==l[1][1]&&(u+=m[o])
for(u/=4,o=0;o<m.length;o++)if(o!==h[1]&&o!==l[0][1]&&o!==l[1][1]&&(m[o]/u>1.5||m[o]/u<.5))return[]}for(o=0;o<m.length;o++)o===h[1]||o===l[0][1]||o===l[1][1]?B.push(1):B.push(0)}else{for(h=[0,0],l=[0,0],o=0;o<m.length;o++)o%2==0?m[o]>h[0]&&(h[0]=m[o],h[1]=o):m[o]>l[0]&&(l[0]=m[o],l[1]=o)
if(h[0]/l[0]>1.55){for(h=[h,[0,0],[0,0]],o=0;o<m.length;o++)if(o%2==0){if(m[o]>h[1][0]&&o!==h[0][1]){h[1][0]=m[o],f=h[1][1],h[1][1]=o,o=f-1
continue}m[o]>h[2][0]&&o!==h[0][1]&&o!==h[1][1]&&(h[2][0]=m[o],h[2][1]=o)}if(SecureCodabar){for(g=h[0][0]+h[1][0]+h[2][0],g/=3,o=0;o<h.length;o++)if(h[o][0]/g>1.5||h[o][0]/g<.5)return[]
for(u=0,o=0;o<m.length;o++)o!==h[0][1]&&o!==h[1][1]&&o!==h[2][1]&&(u+=m[o])
for(u/=4,o=0;o<m.length;o++)if(o!==h[0][1]&&o!==h[1][1]&&o!==h[2][1]&&(m[o]/u>1.5||m[o]/u<.5))return[]}for(o=0;o<m.length;o++)o===h[0][1]||o===h[1][1]||o===h[2][1]?B.push(1):B.push(0)}else{if(SecureCodabar){if(g=h[0]+l[0],g/=2,h[0]/g>1.5||h[0]/g<.5)return[]
if(l[0]/g>1.5||l[0]/g<.5)return[]
for(u=0,o=0;o<m.length;o++)o!==h[1]&&o!==l[1]&&(u+=m[o])
for(u/=5,o=0;o<m.length;o++)if(o!==h[1]&&o!==l[1]&&(m[o]/u>1.5||m[o]/u<.5))return[]}for(o=0;o<m.length;o++)o===h[1]||o===l[1]?B.push(1):B.push(0)}}v.push(B)}}return 3===a?{data:v,correction:C}:v}function CheckCode128(e){var a,r=e[e.length-2].join("")
if(-1===(r=Code128Encoding.value.indexOf(r)))return!1
var t=Code128Encoding.value.indexOf(e[0].join(""))
if(-1===t)return!1
var n=Code128Encoding[e[0].join("")]
if(void 0===n)return!1
if("A"!==n&&"B"!==n&&"C"!==n)return!1
for(a=1;a<e.length-2;a++)if(t+=Code128Encoding.value.indexOf(e[a].join(""))*a,-1===Code128Encoding.value.indexOf(e[a].join("")))return!1
return t%103===r}function Decode2Of5(e){var a,r=""
for(a=0;a<e.length;a++){if(-1===TwoOfFiveEncoding.indexOf(e[a].join("")))return!1
r+=TwoOfFiveEncoding.indexOf(e[a].join(""))}return r}function DecodeCodaBar(e){var a,r="",t=e[0].join(""),n=e[e.length-1].join("")
if("A"!==CodaBarEncoding[t]&&"B"!==CodaBarEncoding[t]&&"C"!==CodaBarEncoding[t]&&"D"!==CodaBarEncoding[t])return!1
if("A"!==CodaBarEncoding[n]&&"B"!==CodaBarEncoding[n]&&"C"!==CodaBarEncoding[n]&&"D"!==CodaBarEncoding[n])return!1
for(a=1;a<e.length-1;a++){if(void 0===CodaBarEncoding[e[a].join("")])return!1
r+=CodaBarEncoding[e[a].join("")]}return r}function checkResultForEAN(e){var a=3,r=0
for(i=e.length-2;i>=0;i--)r+=e[i]*a,a=3===a?1:3
return r=(10-r%10)%10}function DecodeEAN13(e){if(12!==e.length&&7!==e.length)return!1
var a=0
if(7===e.length){if("23"!=e[e.length-1].join(""))return!1
e.splice(e.length-1,1),a=1}var r,t=e.slice(0,6),n=!1,i=e.slice(6,e.length)
for(r=0;r<t.length;r++)if(t[r]=t[r].join(""),4!==t[r].length){n=!0
break}if(n)return!1
for(r=0;r<i.length;r++)if(i[r]=i[r].join(""),4!==i[r].length){n=!0
break}if(n)return!1
var o=[]
for(r=0;r<t.length;r++)if(void 0!==EAN13Encoding.L[t[r]])o.push("L")
else{if(void 0===EAN13Encoding.G[t[r]]){n=!0
break}o.push("G")}if(n)return!1
var c=[]
if(void 0===EAN13Encoding.formats[o.join("")])return!1
for(c.push(EAN13Encoding.formats[o.join("")]),r=0;r<t.length;r++){if(void 0===EAN13Encoding[o[r]][t[r]]){n=!0
break}c.push(EAN13Encoding[o[r]][t[r]])}if(n)return!1
for(r=0;r<i.length;r++)if(void 0!==EAN13Encoding.R[i[r]])c.push(EAN13Encoding.R[i[r]])
else{if(void 0===EAN13Encoding.G[i[r]]){n=!0
break}c.push(EAN13Encoding.G[i[r]])}if(n)return!1
var h=a?c[0]:checkResultForEAN(c.join(""),1)
return(c[c.length-1]===h||c[0]===h)&&c.join("")}function CheckCode93(e){var a=e[e.length-3].join(""),r=e[e.length-2].join(""),t=!0
if(void 0===Code93Encoding[a])return!1
if(void 0===Code93Encoding[r])return!1
var n,i=Code93Encoding[a].value,o=1,c=0
for(n=e.length-4;n>0&&(t=void 0!==Code93Encoding[e[n].join("")]&&t);n--)c+=Code93Encoding[e[n].join("")].value*o,++o>20&&(o=1)
var h=c%47,l=h===i
if(!l)return!1
if(!t)return!1
for(c=h,o=2,i=Code93Encoding[r].value,n=e.length-4;n>0&&(t=void 0!==Code93Encoding[e[n].join("")]&&t);n--)c+=Code93Encoding[e[n].join("")].value*o,++o>15&&(o=1)
return c%47===i&&l}function CheckCode39(e){var a=!0
if(void 0===Code39Encoding[e[0].join("")])return!1
if("*"!==Code39Encoding[e[0].join("")].character)return!1
if(void 0===Code39Encoding[e[e.length-1].join("")])return!1
if("*"!==Code39Encoding[e[e.length-1].join("")].character)return!1
for(i=1;i<e.length-1;i++)if(void 0===Code39Encoding[e[i].join("")]){a=!1
break}return a}function DecodeCode39(e){var a="",r=!1,t="",n=""
for(i=1;i<e.length-1;i++)("$"===(t=Code39Encoding[e[i].join("")].character)||"/"===t||"+"===t||"%"===t)&&i+1<e.length-1?(r=!0,n=t):r?(void 0===ExtendedEncoding[n+t]||(a+=ExtendedEncoding[n+t]),r=!1):a+=t
return a}function DecodeCode93(e){var a="",r=!1,t="",n=""
for(i=1;i<e.length-3;i++)"($)"!==(t=Code93Encoding[e[i].join("")].character)&&"(/)"!==t&&"(+)"!==t&&"(%)"!==t?r?(void 0===ExtendedEncoding[n+t]||(a+=ExtendedEncoding[n+t]),r=!1):a+=t:(r=!0,n=t[1])
return a}function DecodeCode128(e){var a,r,t=Code128Encoding[e[0].join("")],n="Code128",i=""
for(r=1;r<e.length-2;r++)switch(a=Code128Encoding[e[r].join("")][t]){case"FNC1":1===r&&(n="GS1-128")
break
case"FNC2":case"FNC3":case"FNC4":break
case"SHIFT_B":r++,i+=Code128Encoding[e[r].join("")].B
break
case"SHIFT_A":r++,i+=Code128Encoding[e[r].join("")].A
break
case"Code_A":t="A"
break
case"Code_B":t="B"
break
case"Code_C":t="C"
break
default:i+=a}return{string:i,format:n}}function checkFinalResult(e){for(i=0;i<e.length;i++)"EAN-13"===e[i].Format&&7===e[i].Value.length&&(e[i].Value=e[i].Value.substring(1,7),e[i].Format="UPC-E")
return e}TwoOfFiveEncoding=["00110","10001","01001","11000","00101","10100","01100","00011","10010","01010"],Code128Encoding={212222:{A:" ",B:" ",C:"00"},222122:{A:"!",B:"!",C:"01"},222221:{A:'"',B:'"',C:"02"},121223:{A:"#",B:"#",C:"03"},121322:{A:"$",B:"$",C:"04"},131222:{A:"%",B:"%",C:"05"},122213:{A:"&",B:"&",C:"06"},122312:{A:"'",B:"'",C:"07"},132212:{A:"(",B:"(",C:"08"},221213:{A:")",B:")",C:"09"},221312:{A:"*",B:"*",C:"10"},231212:{A:"+",B:"+",C:"11"},112232:{A:",",B:",",C:"12"},122132:{A:"-",B:"-",C:"13"},122231:{A:".",B:".",C:"14"},113222:{A:"/",B:"/",C:"15"},123122:{A:"0",B:"0",C:"16"},123221:{A:"1",B:"1",C:"17"},223211:{A:"2",B:"2",C:"18"},221132:{A:"3",B:"3",C:"19"},221231:{A:"4",B:"4",C:"20"},213212:{A:"5",B:"5",C:"21"},223112:{A:"6",B:"6",C:"22"},312131:{A:"7",B:"7",C:"23"},311222:{A:"8",B:"8",C:"24"},321122:{A:"9",B:"9",C:"25"},321221:{A:":",B:":",C:"26"},312212:{A:";",B:";",C:"27"},322112:{A:"<",B:"<",C:"28"},322211:{A:"=",B:"=",C:"29"},212123:{A:">",B:">",C:"30"},212321:{A:"?",B:"?",C:"31"},232121:{A:"@",B:"@",C:"32"},111323:{A:"A",B:"A",C:"33"},131123:{A:"B",B:"B",C:"34"},131321:{A:"C",B:"C",C:"35"},112313:{A:"D",B:"D",C:"36"},132113:{A:"E",B:"E",C:"37"},132311:{A:"F",B:"F",C:"38"},211313:{A:"G",B:"G",C:"39"},231113:{A:"H",B:"H",C:"40"},231311:{A:"I",B:"I",C:"41"},112133:{A:"J",B:"J",C:"42"},112331:{A:"K",B:"K",C:"43"},132131:{A:"L",B:"L",C:"44"},113123:{A:"M",B:"M",C:"45"},113321:{A:"N",B:"N",C:"46"},133121:{A:"O",B:"O",C:"47"},313121:{A:"P",B:"P",C:"48"},211331:{A:"Q",B:"Q",C:"49"},231131:{A:"R",B:"R",C:"50"},213113:{A:"S",B:"S",C:"51"},213311:{A:"T",B:"T",C:"52"},213131:{A:"U",B:"U",C:"53"},311123:{A:"V",B:"V",C:"54"},311321:{A:"W",B:"W",C:"55"},331121:{A:"X",B:"X",C:"56"},312113:{A:"Y",B:"Y",C:"57"},312311:{A:"Z",B:"Z",C:"58"},332111:{A:"[",B:"[",C:"59"},314111:{A:"\\",B:"\\",C:"60"},221411:{A:"]",B:"]",C:"61"},431111:{A:"^",B:"^",C:"62"},111224:{A:"_",B:"_",C:"63"},111422:{A:"NUL",B:"`",C:"64"},121124:{A:"SOH",B:"a",C:"65"},121421:{A:"STX",B:"b",C:"66"},141122:{A:"ETX",B:"c",C:"67"},141221:{A:"EOT",B:"d",C:"68"},112214:{A:"ENQ",B:"e",C:"69"},112412:{A:"ACK",B:"f",C:"70"},122114:{A:"BEL",B:"g",C:"71"},122411:{A:"BS",B:"h",C:"72"},142112:{A:"HT",B:"i",C:"73"},142211:{A:"LF",B:"j",C:"74"},241211:{A:"VT",B:"k",C:"75"},221114:{A:"FF",B:"l",C:"76"},413111:{A:"CR",B:"m",C:"77"},241112:{A:"SO",B:"n",C:"78"},134111:{A:"SI",B:"o",C:"79"},111242:{A:"DLE",B:"p",C:"80"},121142:{A:"DC1",B:"q",C:"81"},121241:{A:"DC2",B:"r",C:"82"},114212:{A:"DC3",B:"s",C:"83"},124112:{A:"DC4",B:"t",C:"84"},124211:{A:"NAK",B:"u",C:"85"},411212:{A:"SYN",B:"v",C:"86"},421112:{A:"ETB",B:"w",C:"87"},421211:{A:"CAN",B:"x",C:"88"},212141:{A:"EM",B:"y",C:"89"},214121:{A:"SUB",B:"z",C:"90"},412121:{A:"ESC",B:"{",C:"91"},111143:{A:"FS",B:"|",C:"92"},111341:{A:"GS",B:"}",C:"93"},131141:{A:"RS",B:"~",C:"94"},114113:{A:"US",B:"DEL",C:"95"},114311:{A:"FNC3",B:"FNC3",C:"96"},411113:{A:"FNC2",B:"FNC2",C:"97"},411311:{A:"SHIFT_B",B:"SHIFT_A",C:"98"},113141:{A:"Code_C",B:"Code_C",C:"99"},114131:{A:"Code_B",B:"FNC4",C:"Code_B"},311141:{A:"FNC4",B:"Code_A",C:"Code_A"},411131:{A:"FNC1",B:"FNC1",C:"FNC1"},211412:"A",211214:"B",211232:"C",233111:{A:"STOP",B:"STOP",C:"STOP"},value:["212222","222122","222221","121223","121322","131222","122213","122312","132212","221213","221312","231212","112232","122132","122231","113222","123122","123221","223211","221132","221231","213212","223112","312131","311222","321122","321221","312212","322112","322211","212123","212321","232121","111323","131123","131321","112313","132113","132311","211313","231113","231311","112133","112331","132131","113123","113321","133121","313121","211331","231131","213113","213311","213131","311123","311321","331121","312113","312311","332111","314111","221411","431111","111224","111422","121124","121421","141122","141221","112214","112412","122114","122411","142112","142211","241211","221114","413111","241112","134111","111242","121142","121241","114212","124112","124211","411212","421112","421211","212141","214121","412121","111143","111341","131141","114113","114311","411113","411311","113141","114131","311141","411131","211412","211214","211232","233111"]},Code93Encoding={131112:{value:0,character:"0"},111213:{value:1,character:"1"},111312:{value:2,character:"2"},111411:{value:3,character:"3"},121113:{value:4,character:"4"},121212:{value:5,character:"5"},121311:{value:6,character:"6"},111114:{value:7,character:"7"},131211:{value:8,character:"8"},141111:{value:9,character:"9"},211113:{value:10,character:"A"},211212:{value:11,character:"B"},211311:{value:12,character:"C"},221112:{value:13,character:"D"},221211:{value:14,character:"E"},231111:{value:15,character:"F"},112113:{value:16,character:"G"},112212:{value:17,character:"H"},112311:{value:18,character:"I"},122112:{value:19,character:"J"},132111:{value:20,character:"K"},111123:{value:21,character:"L"},111222:{value:22,character:"M"},111321:{value:23,character:"N"},121122:{value:24,character:"O"},131121:{value:25,character:"P"},212112:{value:26,character:"Q"},212211:{value:27,character:"R"},211122:{value:28,character:"S"},211221:{value:29,character:"T"},221121:{value:30,character:"U"},222111:{value:31,character:"V"},112122:{value:32,character:"W"},112221:{value:33,character:"X"},122121:{value:34,character:"Y"},123111:{value:35,character:"Z"},121131:{value:36,character:"-"},311112:{value:37,character:"."},311211:{value:38,character:" "},321111:{value:39,character:"$"},112131:{value:40,character:"/"},113121:{value:41,character:"+"},211131:{value:42,character:"%"},121221:{value:43,character:"($)"},312111:{value:44,character:"(%)"},311121:{value:45,character:"(/)"},122211:{value:46,character:"(+)"},111141:{value:-1,character:"*"}},Code39Encoding={111221211:{value:0,character:"0"},211211112:{value:1,character:"1"},112211112:{value:2,character:"2"},212211111:{value:3,character:"3"},111221112:{value:4,character:"4"},211221111:{value:5,character:"5"},112221111:{value:6,character:"6"},111211212:{value:7,character:"7"},211211211:{value:8,character:"8"},112211211:{value:9,character:"9"},211112112:{value:10,character:"A"},112112112:{value:11,character:"B"},212112111:{value:12,character:"C"},111122112:{value:13,character:"D"},211122111:{value:14,character:"E"},112122111:{value:15,character:"F"},111112212:{value:16,character:"G"},211112211:{value:17,character:"H"},112112211:{value:18,character:"I"},111122211:{value:19,character:"J"},211111122:{value:20,character:"K"},112111122:{value:21,character:"L"},212111121:{value:22,character:"M"},111121122:{value:23,character:"N"},211121121:{value:24,character:"O"},112121121:{value:25,character:"P"},111111222:{value:26,character:"Q"},211111221:{value:27,character:"R"},112111221:{value:28,character:"S"},111121221:{value:29,character:"T"},221111112:{value:30,character:"U"},122111112:{value:31,character:"V"},222111111:{value:32,character:"W"},121121112:{value:33,character:"X"},221121111:{value:34,character:"Y"},122121111:{value:35,character:"Z"},121111212:{value:36,character:"-"},221111211:{value:37,character:"."},122111211:{value:38,character:" "},121212111:{value:39,character:"$"},121211121:{value:40,character:"/"},121112121:{value:41,character:"+"},111212121:{value:42,character:"%"},121121211:{value:-1,character:"*"}},ExtendedEncoding={"/A":"!","/B":'"',"/C":"#","/D":"$","/E":"%","/F":"&","/G":"'","/H":"(","/I":")","/J":"*","/K":"+","/L":",","/O":"/","/Z":":","%F":";","%G":"<","%H":"=","%I":">","%J":"?","%K":"[","%L":"\\","%M":"]","%N":"^","%O":"_","+A":"a","+B":"b","+C":"c","+D":"d","+E":"e","+F":"f","+G":"g","+H":"h","+I":"i","+J":"j","+K":"k","+L":"l","+M":"m","+N":"n","+O":"o","+P":"p","+Q":"q","+R":"r","+S":"s","+T":"t","+U":"u","+V":"v","+W":"w","+X":"x","+Y":"y","+Z":"z","%P":"{","%Q":"|","%R":"|","%S":"~"},CodaBarEncoding={"0000011":"0","0000110":"1","0001001":"2",1100000:"3","0010010":"4",1000010:"5","0100001":"6","0100100":"7","0110000":"8",1001000:"9","0001100":"-","0011000":"$",1000101:":",1010001:"/",1010100:".","0011111":"+","0011010":"A","0001011":"B","0101001":"C","0001110":"D"},EAN13Encoding={L:{3211:0,2221:1,2122:2,1411:3,1132:4,1231:5,1114:6,1312:7,1213:8,3112:9},G:{1123:0,1222:1,2212:2,1141:3,2311:4,1321:5,4111:6,2131:7,3121:8,2113:9},R:{3211:0,2221:1,2122:2,1411:3,1132:4,1231:5,1114:6,1312:7,1213:8,3112:9},formats:{GGGGGG:0,GGLGLL:1,GGLLGL:2,GGLLLG:3,GLGGLL:4,GLLGGL:5,GLLLGG:6,GLGLGL:7,GLGLLG:8,GLLGLG:9,LLLLLL:0,LLGLGG:1,LLGGLG:2,LLGGGL:3,LGLLGG:4,LGGLLG:5,LGGGLL:6,LGLGLG:7,LGLGGL:8,LGGLGL:9}},self.onmessage=function(e){var a,r
switch(ScanImage={data:new Uint8ClampedArray(e.data.scan),width:e.data.scanWidth,height:e.data.scanHeight},e.data.rotation){case 8:ScanImage.data=Rotate(ScanImage.data,ScanImage.width,ScanImage.height,-90),a=e.data.scanWidth,ScanImage.width=ScanImage.height,ScanImage.height=a
break
case 6:ScanImage.data=Rotate(ScanImage.data,ScanImage.width,ScanImage.height,90),a=e.data.scanWidth,ScanImage.width=ScanImage.height,ScanImage.height=a
break
case 3:ScanImage.data=Rotate(ScanImage.data,ScanImage.width,ScanImage.height,180)}Image={data:Scale(ScanImage.data,ScanImage.width,ScanImage.height),width:ScanImage.width/2,height:ScanImage.height/2},e.data.postOrientation&&postMessage({result:Image,success:"orientationData"}),availableFormats=["Code128","Code93","Code39","EAN-13","2Of5","Inter2Of5","Codabar"],FormatPriority=[]
var t=["Code128","Code93","Code39","EAN-13","2Of5","Inter2Of5","Codabar"]
for(SecureCodabar=!0,Secure2Of5=!0,Multiple=!0,void 0!==e.data.multiple&&(Multiple=e.data.multiple),void 0!==e.data.decodeFormats&&(t=e.data.decodeFormats),r=0;r<t.length;r++)FormatPriority.push(t[r])
CreateTable(),CreateScanTable()
var n=Main()
n.length>0?postMessage({result:checkFinalResult(n),success:!0}):postMessage({result:n,success:!1})}
