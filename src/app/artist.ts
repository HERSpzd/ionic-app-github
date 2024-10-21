import { Gender } from "./gender.enum";
import { ArtworkType } from "./artworkType.enum";

/**
 * 
 * Class Artist
 * 
 */
export class Artist {
    artist_id : number | null;
    name : string;
    dob : Date;
    gender : Gender;
    artwork_type : ArtworkType;
    contact_info : string; 
    exhibition_date : Date;
    special_notes : string | null;
    is_featured_artist : boolean;


    /**
     * 
     * Artist Constructor
     * 
     * @param artistID 
     * @param name 
     * @param dob 
     * @param gender 
     * @param artworkType 
     * @param contactInfo 
     * @param exhibitionDate 
     * @param specialNotes 
     * @param isFeaturedArtist 
     */
    constructor(artistID : number, name : string, dob : Date, gender:Gender, artworkType : ArtworkType,contactInfo : string, exhibitionDate : Date, specialNotes : string, isFeaturedArtist : boolean) {
        this.artist_id = artistID;
        this.name = name;
        this.dob = dob;
        this.gender = gender;
        this.artwork_type = artworkType;
        this.contact_info = contactInfo;
        this.exhibition_date = exhibitionDate;
        this.special_notes = specialNotes;
        this.is_featured_artist = isFeaturedArtist;
    }



}