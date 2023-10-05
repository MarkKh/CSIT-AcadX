import React, {useEffect} from 'react';
import LikeHero from '../components/Like/LikeHero'
import ReportLike from '../components/Like/LikeReport'; // Use uppercase for component name
import CoopLike from '../components/Like/LikeCoop'
import AlertLike from '../components/Like/LikeAlert';

function Like() {
    useEffect(() => {
        document.title = 'AcadX | Like';
      }, []);
    return (
        <div>            
            <AlertLike />
            <LikeHero />
            <ReportLike />
            <CoopLike />

        </div>
    );
}

export default Like;
