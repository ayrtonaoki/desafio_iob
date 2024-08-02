require 'net/http'
require 'json'

class CountriesController < ApplicationController
  before_action :authenticate_user!

  def name
    country_name = params[:country]
    if country_name.present?
      response = fetch_country_data(country_name)
      render json: response
    else
      render json: { error: 'Country name not provided' }, status: :bad_request
    end
  end

  private

  def fetch_country_data(name)
    uri = URI("https://restcountries.com/v3.1/name/#{URI.encode(name)}")
    response = Net::HTTP.get_response(uri)

    case response
    when Net::HTTPSuccess
      JSON.parse(response.body)
    else
      { error: 'Failed to fetch country data', status: response.code }
    end
  end
end
