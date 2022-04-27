import moment from 'moment'

class DateFormat {
  public fromNow(date: any): string {
    return moment(date).fromNow()
  }
}

export default new DateFormat()
