const mongoose = require("mongoose")
const env = require("../env.configs")
const medialModel = require("../App/models/Media")
exports.jsonMedias = [
    {
        "title": "Beyond Earth",
        "images": {
            "trending": {
                "small": "public/images/beyond-earth/trending/small.jpg",
                "large": "public/images/beyond-earth/trending/large.jpg"
            },
            "regular": {
                "small": "public/images/beyond-earth/regular/small.jpg",
                "medium": "public/images/beyond-earth/regular/medium.jpg",
                "large": "public/images/beyond-earth/regular/large.jpg"
            }
        },
        "year": 2019,
        "category": "Movie",
        "rating": "PG",
        "isTrending": true
    },
    {
        "title": "Bottom Gear",
        "images": {
            "trending": {
                "small": "public/images/bottom-gear/trending/small.jpg",
                "large": "public/images/bottom-gear/trending/large.jpg"
            },
            "regular": {
                "small": "public/images/bottom-gear/regular/small.jpg",
                "medium": "public/images/bottom-gear/regular/medium.jpg",
                "large": "public/images/bottom-gear/regular/large.jpg"
            }
        },
        "year": 2021,
        "category": "Movie",
        "rating": "PG",
        "isTrending": true
    },
    {
        "title": "Undiscovered Cities",
        "images": {
            "trending": {
                "small": "public/images/undiscovered-cities/trending/small.jpg",
                "large": "public/images/undiscovered-cities/trending/large.jpg"
            },
            "regular": {
                "small": "public/images/undiscovered-cities/regular/small.jpg",
                "medium": "public/images/undiscovered-cities/regular/medium.jpg",
                "large": "public/images/undiscovered-cities/regular/large.jpg"
            }
        },
        "year": 2019,
        "category": "TV Series",
        "rating": "E",
        "isTrending": true
    },
    {
        "title": "1998",
        "images": {
            "trending": {
                "small": "public/images/1998/trending/small.jpg",
                "large": "public/images/1998/trending/large.jpg"
            },
            "regular": {
                "small": "public/images/1998/regular/small.jpg",
                "medium": "public/images/1998/regular/medium.jpg",
                "large": "public/images/1998/regular/large.jpg"
            }
        },
        "year": 2021,
        "category": "Movie",
        "rating": "18+",
        "isTrending": true
    },
    {
        "title": "Dark Side of the Moon",
        "images": {
            "trending": {
                "small": "public/images/dark-side-of-the-moon/trending/small.jpg",
                "large": "public/images/dark-side-of-the-moon/trending/large.jpg"
            },
            "regular": {
                "small": "public/images/dark-side-of-the-moon/regular/small.jpg",
                "medium": "public/images/dark-side-of-the-moon/regular/medium.jpg",
                "large": "public/images/dark-side-of-the-moon/regular/large.jpg"
            }
        },
        "year": 2018,
        "category": "TV Series",
        "rating": "PG",
        "isTrending": true
    },
    {
        "title": "The Great Lands",
        "images": {
            "regular": {
                "small": "public/images/the-great-lands/regular/small.jpg",
                "medium": "public/images/the-great-lands/regular/medium.jpg",
                "large": "public/images/the-great-lands/regular/large.jpg"
            }
        },
        "year": 2019,
        "category": "Movie",
        "rating": "E",
        "isTrending": false
    },
    {
        "title": "The Diary",
        "images": {
            "regular": {
                "small": "public/images/the-diary/regular/small.jpg",
                "medium": "public/images/the-diary/regular/medium.jpg",
                "large": "public/images/the-diary/regular/large.jpg"
            }
        },
        "year": 2019,
        "category": "TV Series",
        "rating": "PG",
        "isTrending": false
    },
    {
        "title": "Earth’s Untouched",
        "images": {
            "regular": {
                "small": "public/images/earths-untouched/regular/small.jpg",
                "medium": "public/images/earths-untouched/regular/medium.jpg",
                "large": "public/images/earths-untouched/regular/large.jpg"
            }
        },
        "year": 2017,
        "category": "Movie",
        "rating": "18+",
        "isTrending": false
    },
    {
        "title": "No Land Beyond",
        "images": {
            "regular": {
                "small": "public/images/no-land-beyond/regular/small.jpg",
                "medium": "public/images/no-land-beyond/regular/medium.jpg",
                "large": "public/images/no-land-beyond/regular/large.jpg"
            }
        },
        "year": 2019,
        "category": "Movie",
        "rating": "E",
        "isTrending": false
    },
    {
        "title": "During the Hunt",
        "images": {
            "regular": {
                "small": "public/images/during-the-hunt/regular/small.jpg",
                "medium": "public/images/during-the-hunt/regular/medium.jpg",
                "large": "public/images/during-the-hunt/regular/large.jpg"
            }
        },
        "year": 2016,
        "category": "TV Series",
        "rating": "PG",
        "isTrending": false
    },
    {
        "title": "Autosport the Series",
        "images": {
            "regular": {
                "small": "public/images/autosport-the-series/regular/small.jpg",
                "medium": "public/images/autosport-the-series/regular/medium.jpg",
                "large": "public/images/autosport-the-series/regular/large.jpg"
            }
        },
        "year": 2016,
        "category": "TV Series",
        "rating": "18+",
        "isTrending": false
    },
    {
        "title": "Same Answer II",
        "images": {
            "regular": {
                "small": "public/images/same-answer-2/regular/small.jpg",
                "medium": "public/images/same-answer-2/regular/medium.jpg",
                "large": "public/images/same-answer-2/regular/large.jpg"
            }
        },
        "year": 2017,
        "category": "Movie",
        "rating": "E",
        "isTrending": false
    },
    {
        "title": "Below Echo",
        "images": {
            "regular": {
                "small": "public/images/below-echo/regular/small.jpg",
                "medium": "public/images/below-echo/regular/medium.jpg",
                "large": "public/images/below-echo/regular/large.jpg"
            }
        },
        "year": 2016,
        "category": "TV Series",
        "rating": "PG",
        "isTrending": false
    },
    {
        "title": "The Rockies",
        "images": {
            "regular": {
                "small": "public/images/the-rockies/regular/small.jpg",
                "medium": "public/images/the-rockies/regular/medium.jpg",
                "large": "public/images/the-rockies/regular/large.jpg"
            }
        },
        "year": 2015,
        "category": "TV Series",
        "rating": "E",
        "isTrending": false
    },
    {
        "title": "Relentless",
        "images": {
            "regular": {
                "small": "public/images/relentless/regular/small.jpg",
                "medium": "public/images/relentless/regular/medium.jpg",
                "large": "public/images/relentless/regular/large.jpg"
            }
        },
        "year": 2017,
        "category": "Movie",
        "rating": "PG",
        "isTrending": false
    },
    {
        "title": "Community of Ours",
        "images": {
            "regular": {
                "small": "public/images/community-of-ours/regular/small.jpg",
                "medium": "public/images/community-of-ours/regular/medium.jpg",
                "large": "public/images/community-of-ours/regular/large.jpg"
            }
        },
        "year": 2018,
        "category": "TV Series",
        "rating": "18+",
        "isTrending": false
    },
    {
        "title": "Van Life",
        "images": {
            "regular": {
                "small": "public/images/van-life/regular/small.jpg",
                "medium": "public/images/van-life/regular/medium.jpg",
                "large": "public/images/van-life/regular/large.jpg"
            }
        },
        "year": 2015,
        "category": "Movie",
        "rating": "PG",
        "isTrending": false
    },
    {
        "title": "The Heiress",
        "images": {
            "regular": {
                "small": "public/images/the-heiress/regular/small.jpg",
                "medium": "public/images/the-heiress/regular/medium.jpg",
                "large": "public/images/the-heiress/regular/large.jpg"
            }
        },
        "year": 2021,
        "category": "Movie",
        "rating": "PG",
        "isTrending": false
    },
    {
        "title": "Off the Track",
        "images": {
            "regular": {
                "small": "public/images/off-the-track/regular/small.jpg",
                "medium": "public/images/off-the-track/regular/medium.jpg",
                "large": "public/images/off-the-track/regular/large.jpg"
            }
        },
        "year": 2017,
        "category": "Movie",
        "rating": "18+",
        "isTrending": false
    },
    {
        "title": "Whispering Hill",
        "images": {
            "regular": {
                "small": "public/images/whispering-hill/regular/small.jpg",
                "medium": "public/images/whispering-hill/regular/medium.jpg",
                "large": "public/images/whispering-hill/regular/large.jpg"
            }
        },
        "year": 2017,
        "category": "Movie",
        "rating": "E",
        "isTrending": false
    },
    {
        "title": "112",
        "images": {
            "regular": {
                "small": "public/images/112/regular/small.jpg",
                "medium": "public/images/112/regular/medium.jpg",
                "large": "public/images/112/regular/large.jpg"
            }
        },
        "year": 2013,
        "category": "TV Series",
        "rating": "PG",
        "isTrending": false
    },
    {
        "title": "Lone Heart",
        "images": {
            "regular": {
                "small": "public/images/lone-heart/regular/small.jpg",
                "medium": "public/images/lone-heart/regular/medium.jpg",
                "large": "public/images/lone-heart/regular/large.jpg"
            }
        },
        "year": 2017,
        "category": "Movie",
        "rating": "E",
        "isTrending": false
    },
    {
        "title": "Production Line",
        "images": {
            "regular": {
                "small": "public/images/production-line/regular/small.jpg",
                "medium": "public/images/production-line/regular/medium.jpg",
                "large": "public/images/production-line/regular/large.jpg"
            }
        },
        "year": 2018,
        "category": "TV Series",
        "rating": "PG",
        "isTrending": false
    },
    {
        "title": "Dogs",
        "images": {
            "regular": {
                "small": "public/images/dogs/regular/small.jpg",
                "medium": "public/images/dogs/regular/medium.jpg",
                "large": "public/images/dogs/regular/large.jpg"
            }
        },
        "year": 2016,
        "category": "TV Series",
        "rating": "E",
        "isTrending": false
    },
    {
        "title": "Asia in 24 Days",
        "images": {
            "regular": {
                "small": "public/images/asia-in-24-days/regular/small.jpg",
                "medium": "public/images/asia-in-24-days/regular/medium.jpg",
                "large": "public/images/asia-in-24-days/regular/large.jpg"
            }
        },
        "year": 2020,
        "category": "TV Series",
        "rating": "PG",
        "isTrending": false
    },
    {
        "title": "The Tasty Tour",
        "images": {
            "regular": {
                "small": "public/images/the-tasty-tour/regular/small.jpg",
                "medium": "public/images/the-tasty-tour/regular/medium.jpg",
                "large": "public/images/the-tasty-tour/regular/large.jpg"
            }
        },
        "year": 2016,
        "category": "TV Series",
        "rating": "PG",
        "isTrending": false
    },
    {
        "title": "Darker",
        "images": {
            "regular": {
                "small": "public/images/darker/regular/small.jpg",
                "medium": "public/images/darker/regular/medium.jpg",
                "large": "public/images/darker/regular/large.jpg"
            }
        },
        "year": 2017,
        "category": "Movie",
        "rating": "18+",
        "isTrending": false
    },
    {
        "title": "Unresolved Cases",
        "images": {
            "regular": {
                "small": "public/images/unresolved-cases/regular/small.jpg",
                "medium": "public/images/unresolved-cases/regular/medium.jpg",
                "large": "public/images/unresolved-cases/regular/large.jpg"
            }
        },
        "year": 2018,
        "category": "TV Series",
        "rating": "18+",
        "isTrending": false
    },
    {
        "title": "Mission: Saturn",
        "images": {
            "regular": {
                "small": "public/images/mission-saturn/regular/small.jpg",
                "medium": "public/images/mission-saturn/regular/medium.jpg",
                "large": "public/images/mission-saturn/regular/large.jpg"
            }
        },
        "year": 2017,
        "category": "Movie",
        "rating": "PG",
        "isTrending": false
    }
]

exports.populateMediaCollection = async (jsonMedias) => {
    try {
        const medias = await medialModel.find().exec();
        if (medias.length !==0) throw new Error("The media collection is not empty!!! drop it first and retry again!!")
        jsonMedias.forEach((jsonMedia) => {
            const media = new medialModel(jsonMedia)
            media.save().catch(error => {
                throw new Error(" Error while inserting : " + media.title + ", Here is what happened : " + error.message)
            })
        })
    } catch (e) {
        throw e
    }
}

mongoose.connect(env.configs.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connexion à MongoDB réussie !')
    this.populateMediaCollection(this.jsonMedias).then(r => {
        console.info("The media collection has been populated successfully!!")
        //todo : close the opened connexion
    }).catch(error => {
        throw new Error(error.message)
        //todo : close the opened connexion
    })
}).catch((error) => {
    console.log('Connexion à MongoDB échouée ! la cause en dessous : ')
    console.log(error.message)
});


