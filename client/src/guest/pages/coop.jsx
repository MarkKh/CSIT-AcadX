import React from 'react'
import CoopData from '../../admin/pages/coop'
import CoopHero from '../components/Coop/CoopHero';

function Coop() {
    return (
        <>
            <div className="container grid px-6 mx-auto">
                <CoopHero />
                <CoopData />
            </div>
        </>
    );
}

export default Coop
