/* Import Images */
import Froggo from 'webroot/img/froggo.jpg';
import Bee from 'webroot/img/bee.jpg';
import Ichtyosaurus from 'webroot/img/ichtyosaurus.jpg';
import Bird from 'webroot/img/bird.jpg';
import SeaTurtle from 'webroot/img/sea_turtle.jpg';


const ObliqueBanner = () => {
    return (
        <div>
            <div className="obliqueBannerShadow" />

            <div className="obliqueBanner">

                <div className="obliqueHeadDiv">
                    <div className="obliqueDivOne">
                        <img className="obliqueDivOneImage"
                            alt="obliqueBannerFrogImage"
                            src={Froggo}
                        />
                    </div>

                    <div className="obliqueDivTwo">
                        <img className="obliqueDivTwoImage"
                            alt="obliqueBannerIchtyosaurusImage"
                            src={Ichtyosaurus}
                        />
                    </div>

                    <div className="obliqueDivThree">
                        <img className="obliqueDivThreeImage"
                            alt="obliqueBannerBeeImage"
                            src={Bee}
                        />
                    </div>

                    <div className="obliqueDivFour">
                        <img className="obliqueDivFourImage"
                            alt="obliqueBannerBirdImage"
                            src={Bird}
                        />
                    </div>

                    <div className="obliqueDivFive">
                        <img className="obliqueDivFiveImage"
                            alt="obliqueBannerTurtleImage"
                            src={SeaTurtle}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ObliqueBanner;