const fs = require("fs");
const {Readable} =require("stream");

module.exports.Multiform=function(req,res,next){
const boundary_data=req.headers["content-type"].split(";").map((item)=>item.trim());
if(boundary_data[0]==="multipart/form-data"){

    let raw_string="";
    const boundary_split_string=boundary_data[1].slice("boundary=".length);
    let end_form={};
    let absolute=[];

    req.on("data",(data)=>{
        absolute.push(data);
        raw_string+=data;
    });
    req.on("end",()=>{
        absolute=Buffer.concat(absolute);
        let buffer_count=0;
        const raw_string_array=raw_string.split(boundary_split_string.toString());
        for(let part of raw_string_array){
            let key=part.match(/(?:name=")(.*?)(?:")/)?.[1];
            if (!key && key==null){
                continue;
            }else{
                let value=part.match(/(?:\r\n\r\n)([\S\s]*)(?:\r\n--$)/)?.[1];
                if(!value){
                    continue;
                }else {
                    let filename=part.match(/(?:filename=")(.*?)(?:")/)?.[1];
                    if (!filename){
                        end_form[key.toString().trim()]=value.toString().trim();
                        let Regex_match_text=`\r\nContent-Disposition: form-data; name="`+key+`"\r\n\r\n`+value+`\r\n--`;
                        let cnt=absolute.toString().indexOf(Regex_match_text)+Regex_match_text.length;
                        buffer_count=(cnt!==-1)?cnt:buffer_count;
                        absolute=absolute.slice(Buffer.byteLength(absolute.toString().substring(0,buffer_count)),Buffer.byteLength(absolute.toString()));
                        continue;
                    }
                    else {
                        let file={};
                        let contentType=part.match(/(?:Content-Type:)(.*?)(?:\r\n)/)?.[1];
                        file["filename"]=filename.toString().trim();
                        file["Content-Type"]=contentType.toString().trim();
                        let regex_match_file=`Content-Type: image/jpeg\r\n\r\n`;
                        let regex_match_end=`--${boundary_split_string}`;
                        let cnt=absolute.toString().indexOf(regex_match_file)+regex_match_file.length;
                        buffer_count=(cnt!==-1)?cnt:buffer_count;
                        absolute=absolute.slice(Buffer.byteLength(absolute.toString().substring(0,buffer_count)),Buffer.byteLength(absolute.toString()));
                        buffer_count=absolute.toString().indexOf(regex_match_end);
                        let Image=absolute.slice(0,absolute.indexOf(Buffer.from(`${regex_match_end}`)));
                        file["Image"]=Readable.from(Buffer.from(Image));
                        absolute=absolute.slice(Buffer.byteLength(absolute.slice(0,absolute.indexOf(Buffer.from(`${regex_match_end}`)))),Buffer.byteLength(absolute.toString()));
                        if(!end_form.files){
                            end_form.files=[];
                        }
                        end_form.files.push(file);
                    }
                }
            }
        }
       req.currentUser=end_form.files;
       next();
    });
}
else {
    next();
}
 }

