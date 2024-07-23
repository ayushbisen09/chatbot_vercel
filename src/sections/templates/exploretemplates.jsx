import { Box } from "@mui/material";
import { useState } from "react";
import TemplateList from "./templatelist";

export default function ExploreTemplate(){
    const [selectedListItem, setSelectedListItem] = useState(0);
    
    const handleListItemSelect = (index) => {
      setSelectedListItem(index);
    };
    return(
        <Box sx={{width:'100%',display:'flex'}}>
            <TemplateList onItemSelect={handleListItemSelect}/>

        </Box>
    )
}