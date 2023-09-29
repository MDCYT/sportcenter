import Image from "next/image"

interface FeatureCardProps {
    imageurl?: string
    title?: string
    features?: string[]
    alternative?: Boolean
}

function FeatureCard({ imageurl, title, features, alternative = false }: FeatureCardProps) {

    const image = <Image src={imageurl ? imageurl : '/images/check.svg'} alt="Icon" width={50} height={50} />
    const thetitle = title || 'Calidad'
    const thefeatures = features || ['Tejidos suaves y transpirables', 'Costura resistente', 'Ajuste perfecto']

    return (
        <div className={`m-3 flex flex-wrap flex-col items-center align-middle justify-center ${alternative ? "bg-white rounded-xl" : ""}`}>
            {image}
            <h3 className="text-lg font-bold">{thetitle}</h3>
            <ul className="list-disc text-xs">
                {
                    thefeatures.map((feature, index) => {
                        return (
                            <li key={index}>{feature}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default FeatureCard;