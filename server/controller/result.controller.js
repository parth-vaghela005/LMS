const { Result } = require("../models/result.model")
const { Test } = require("../models/test.model")

const CheckAns = async (req, res) => {
    try {
        const { lectureId, selectedOption, quizeId } = req.body
        const userId = req.id
        const result = await Result.findOne({
            lectureId,
            userId,
        })
        if (!result) {
            const NewResult = new Result({
                lectureId,
                userId,
            })
            await NewResult.save()
        }

        const quize = await Test.findOne({
            _id: quizeId,
            lectureId
        })
        if (!quize) {
            return res.status(404).json({
                success: false,
                message: "Test not found",
            })
        }
        if (quize.options[correctAnswer] == selectedOption) {
            const result = await Result.findOneAndUpdate({
                lectureId,
                userId,
            })
            result.correct_questions.push({
                quizeId: quizeId,
                question: quize.question,
                answer: quize.correctAnswer,
                yourans: selectedOption
            })
            await result.save()
        } else {
            const result = await Result.findOneAndUpdate({
                lectureId,
                userId,
            })
            result.wrong_questions.push({
                quizeId: quizeId,
                question: quize.question,
                answer: quize.correctAnswer,
                yourans: selectedOption
            })
            await result.save()
        }
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: "some problem found!",
            error: error.message
        })
    }
}
module.exports = {
    CheckAns
}